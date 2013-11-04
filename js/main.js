require([
    'vendor/gf',
    'game/data/resources',
    'game/states/Intro',
    'game/states/Select',
    'game/states/Play',
    'game/entities/misc/Torch',
    'game/entities/misc/Flower'
], function(gf, resources, IntroState, SelectState, PlayState, Torch, Flower) {
    var $game, game, muted;

    window.lttp = {
        firstZone: true
    };

    $(function() {
        $game = $('#game');

        //set the default scale mode for PIXI
        gf.Texture.SCALE_MODE.DEFAULT = gf.Texture.SCALE_MODE.NEAREST;

        lttp.game = game = new gf.Game('game', {
            gravity: 0,
            friction: [0, 0],
            width: $game.width(),
            height: $game.height(),
            transparent: true,
            renderer: gf.RENDERER.CANVAS
        });
        gfdebug.show(game);

        game.spritepool.add('torch', Torch);
        game.spritepool.add('flower', Flower);

        resources.load(game);

        game.load.on('progress', function(e) {
        });

        game.load.on('complete', function() {
            //load starting states
            lttp.intro = new IntroState(game);
            lttp.intro.start();

            //load select state
            lttp.select = new SelectState(game);
            lttp.select.on('select', loadGame);

            //load the play state
            lttp.play = new PlayState(game);

            game.input.keyboard.on(gf.Keyboard.KEY.ENTER, gotoSelect);
            game.input.keyboard.on(gf.Keyboard.KEY.SPACE, gotoSelect);
            game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.FACE_1, gotoSelect);
            game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.START, gotoSelect);

            game.input.keyboard.once(gf.Keyboard.KEY.TILDE, onDebug);
            game.input.keyboard.on(gf.Keyboard.KEY.P, onToggleAudio);
            game.input.gamepad.buttons.on(gf.GamepadButtons.BUTTON.RIGHT_SHOULDER, onToggleAudio);

            //start render loop
            game.render();
        });

        game.load.start();
    });

    function gotoSelect() {
        lttp.intro.stop();

        game.input.keyboard.off(gf.Keyboard.KEY.ENTER, gotoSelect);
        game.input.keyboard.off(gf.Keyboard.KEY.SPACE, gotoSelect);
        game.input.gamepad.buttons.off(gf.GamepadButtons.BUTTON.FACE_1, gotoSelect);
        game.input.gamepad.buttons.off(gf.GamepadButtons.BUTTON.START, gotoSelect);

        lttp.select.start();
    }

    function loadGame(save) {
        lttp.select.stop();

        lttp.play.start(save);
    }

    function onDebug() {
        gfdebug.show(game);
    }

    function onToggleAudio(status) {
        if(status.down) return;

        if(muted) {
            lttp.intro.audio.unmute();
            lttp.select.audio.unmute();
            //lttp.play.audio.unmute();
            muted = false;
        } else {
            lttp.intro.audio.mute();
            lttp.select.audio.mute();
            //lttp.play.audio.mute();
            muted = true;
        }
    }
});