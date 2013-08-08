define([
], function() {
    return [
        //Special items
        {
            name: 'sword',
            icon: 'items/sword%d.png',
            position: [180, 160]
        },
        {
            name: 'shield',
            icon: 'items/shield%d.png',
            position: [200, 160]
        },
        {
            name: 'armor',
            icon: 'items/armor%d.png',
            position: [220, 160]
        },
        {
            name: 'boot',
            icon: 'items/boot.png',
            position: [32, 190]
        },
        {
            name: 'gloves',
            icon: 'items/gloves%d.png',
            position: [64, 190]
        },
        {
            name: 'flippers',
            icon: 'items/flippers.png',
            position: [96, 190]
        },
        {
            name: 'pearl',
            icon: 'items/pearl.png',
            position: [128, 190]
        },
        {
            name: 'heart',
            icon: 'items/heart%d.png',
            position: [200, 190]
        },
        {
            name: 'txtLiftNum',
            icon: 'text/%d.png',
            position: [67, 161]
        },
        {
            name: 'txtRun',
            icon: 'text/run.png',
            position: [81, 176]
        },
        {
            name: 'txtSwim',
            icon: 'text/swim.png',
            position: [121, 176]
        },
        //equiptable items
        {
            name: 'bow',
            icon: function(link) {
                if(link.inventory.silver_arrows && link.inventory.arrows)
                    return 'items/bow_and_silver_arrow.png';
                else if(link.inventory.arrows)
                    return 'items/bow_and_arrow.png'
                else
                    return 'items/bow.png';
            },
            _icon: 'items/bow.png',
            position: [32, 32]
        },
        {
            name: 'boomerang',
            icon: 'items/boomerang%d.png',
            position: [56, 32]
        },
        {
            name: 'hookshot',
            icon: 'items/hookshot.png',
            position: [80, 32]
        },
        {
            name: 'bombs',
            icon: 'items/bomb.png',
            position: [104, 32]
        },
        {
            name: 'mushroom',
            icon: 'items/mushroom.png',
            position: [128, 32]
        },
        {
            name: 'powder',
            icon: 'items/magic_powder.png',
            position: [128, 32]
        },
        {
            name: 'firerod',
            icon: 'items/firerod.png',
            position: [32, 56]
        },
        {
            name: 'icerod',
            icon: 'items/icerod.png',
            position: [56, 56]
        },
        {
            name: 'bombos',
            icon: 'items/bombos.png',
            position: [80, 56]
        },
        {
            name: 'ether',
            icon: 'items/ether.png',
            position: [104, 56]
        },
        {
            name: 'quake',
            icon: 'items/quake.png',
            position: [128, 56]
        },
        {
            name: 'lantern',
            icon: 'items/lantern.png',
            position: [32, 80]
        },
        {
            name: 'hammer',
            icon: 'items/hammer.png',
            position: [56, 80]
        },
        {
            name: 'shovel',
            icon: 'items/shovel.png',
            position: [80, 80]
        },
        {
            name: 'flute',
            icon: 'items/flute.png',
            position: [80, 80]
        },
        {
            name: 'net',
            icon: 'items/net.png',
            position: [104, 80]
        },
        {
            name: 'book',
            icon: 'items/book_of_mudora.png',
            position: [128, 80]
        },
        {
            name: 'bottle',
            icon: 'items/bottle_empty.png', ///hmmmm..
            position: [32, 104]
        },
        {
            name: 'somaria',
            icon: 'items/cane_of_somaria.png',
            position: [56, 104]
        },
        {
            name: 'byrna',
            icon: 'items/cane_of_byrna.png',
            position: [80, 104]
        },
        {
            name: 'cape',
            icon: 'items/magic_cape.png',
            position: [104, 104]
        },
        {
            name: 'mirror',
            icon: 'items/magic_mirror.png',
            position: [128, 104]
        }
    ];
});