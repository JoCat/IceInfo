/*
 JCat Stream Info v.2.0.0_beta2 - Informer for Site (Icecast2 Online Radio)
 Copyright (c) 2016-2019 Andrew Molchanov
 https://github.com/JoCat/JSInfo
*/

// Informer Object
JSInfo = {
    // Params
    server_address: 'http://127.0.0.1:8000/', // Default address:port
    mounts_list: ['live', 'nonstop'], // Mount point list
    info_link: 'info.xsl', // Info file
    time_update: 10, // Time to update information (in seconds)

    // Functions
    init(init_params) {
        // Setting transmitted parameters
        if (typeof init_params == 'object') {
            for (let parameter of Object.keys(init_params)) {
                this[parameter] = init_params[parameter];
            }
        }

        let _this = this;
        let timer = setTimeout(function showinfo() {
            $.ajax({
                dataType: 'json',
                url: _this.server_address + _this.info_link,
                success: function(d) {
                    for (let mount_name of _this.mounts_list) {
                        if (d[mount_name]) {
                          for (let param of Object.keys(d[mount_name])) {
                            $("#jsi-"+param).html(d[mount_name][param]);
                          }
                          break;
                        }
                    }
                }
            });
            timer = setTimeout(showinfo, _this.time_update*1000);
        }, _this.time_update*1000);
    },

};
