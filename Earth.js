var Globe = function (radius, segments) {

    THREE.Object3D.call(this);
  
    this.name = "Globe";
  
    var that = this;
  
    // instantiate a loader
    var loader = new THREE.TextureLoader();
  
    // earth textures
    var textures = {
      'map': {
        url: 'images/relief.jpg',
        val: undefined
      },
      'bumpMap': {
        url: 'images/elev_bump_4k.jpg',
        val: undefined
      },
      'specularMap': {
        url: 'images/wateretopo.png',
        val: undefined
      }
    };
  
    var texturePromises = [], path = './';
  
    for (var key in textures) {
      texturePromises.push(new Promise((resolve, reject) => {
        var entry = textures[key]
        var url = path + entry.url
        loader.load(url,
          texture => {
            entry.val = texture;
            if (entry.val instanceof THREE.Texture) resolve(entry);
          },
          xhr => {
            console.log(url + ' ' + (xhr.loaded / xhr.total * 100) +
              '% loaded');
          },
          xhr => {
            reject(new Error(xhr +
              'An error occurred loading while loading: ' +
              entry.url));
          }
        );
      }));
    }
  
    // load the geometry and the textures
    Promise.all(texturePromises).then(loadedTextures => {
      var geometry = new THREE.SphereGeometry(radius, segments, segments);
      var material = new THREE.MeshPhongMaterial({
        map: textures.map.val,
        bumpMap: textures.bumpMap.val,
        bumpScale: 0.005,
        specularMap: textures.specularMap.val,
        specular: new THREE.Color('grey')
      });
  
      var earth = that.earth = new THREE.Mesh(geometry, material);
      that.add(earth);
    });
  
    // clouds
    loader.load('images/n_amer_clouds.png', map => {
      var geometry = new THREE.SphereGeometry(radius + .05, segments, segments);
      var material = new THREE.MeshPhongMaterial({
        map: map,
        transparent: true
      });
  
      var clouds = that.clouds = new THREE.Mesh(geometry, material);
      that.add(clouds);
    });
  }
  
  Globe.prototype = Object.create(THREE.Object3D.prototype);
  Globe.prototype.constructor = Globe;