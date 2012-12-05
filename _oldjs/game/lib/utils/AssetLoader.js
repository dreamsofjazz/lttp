define([
    'game/lib/bases/Emitter',
    'game/data/types',
    'game/data/items',
    'game/data/sprites'
], function(Emitter, types, items, sprites) {
    var _cache = {};

    var AssetLoader = Emitter.extend({
        init: function() {
        },
        loadResources: function(resources, cb) {
            var self = this,
                loaded = 0;

            resources.forEach(function(rsrc) {
                self.loadResource(rsrc, function(err, data) {
                    if(!err)
                        rsrc.data = data;
                    else
                        rsrc.data = null;

                    loaded++;
                    if(loaded === resources.length)
                        completed();
                });
            });

            function completed() {
                //all of the loaders finished
                var ret = {};

                //this will convert the dot-notation string into actual object properties
                for(var r = 0, rl = resources.length; r < rl; ++r) {
                    util.setObjectProperty(ret, resources[r].name, resources[r].data);
                }

                self.emit('complete', ret);
                if(cb) cb(ret);
            };
        },
        loadResource: function(resource, cb) {
            if(_cache[resource.src])
                return _cache[resource.src];

            //massage type into the class name
            var self = this,
                type = resource.type[0].toUpperCase() + resource.type.substring(1);

            //special case
            if(type == 'Model') type = 'JSON';

            //console.log(type);
            //if loader exists in THREE then use it
            if(THREE[type + 'Loader']) {
                //load the resource
                var loader = new THREE[type + 'Loader']();

                loader.addEventListener('error', function(msg) {
                    if(cb) cb(msg);
                });

                loader.addEventListener('load', function(evt) {
                    _cache[resource.src] = evt.content;
                    if(cb) cb(null, evt.content);
                });

                loader.load(resource.src);
            }
            //otherwise manually load
            else {
                $.ajax({
                    url: resource.src,
                    context: this,
                    dataType: resource.type,
                    type: 'GET',
                    error: function(jqXHR, textStatus, errorThrown) {
                        if(cb) cb(errorThrown || textStatus);
                    },
                    success: function(data, textStatus, jqXHR) {
                        //parse this object to have correct types defined
                        if(typeof data == 'object') {
                            //set type
                            if(data.type) {
                                var type = data.type.split('.');
                                data.type = types[type[0]][type[1]];
                            }

                            //set subtype
                            if(data.type == types.ENTITY.ITEM && data.subtype) {
                                data.subtype = items[data.subtype]
                            } else if(data.subtype) {
                                var type = data.subtype.split('.');
                                data.subtype = types[type[0]][type[1]];
                            }

                            //set sprite if needed
                            if(data.sprite && typeof data.sprite == 'string') {
                                var spr = data.sprite.split('.');
                                data.sprite  = sprites[spr[0]][spr[1]];
                            }
                        }

                        _cache[resource.src] = data;

                        if(cb) cb(null, data);
                    }
                });
            }
        }
    });

    return AssetLoader;
});