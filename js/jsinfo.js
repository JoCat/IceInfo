/*
 JCat Stream Info v.2.0.0_beta1 - Informer for Site (Icecast2 Online Radio)
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
    init: function (init_params) {
        // Setting transmitted parameters
        if (typeof init_params == 'object') {
            for (let parameter of Object.keys(init_params)) {
                JSInfo[parameter] = init_params[parameter];
            }
        }

        timer = setTimeout(function showinfo() {
            $.ajax({
                dataType: 'json',
                url: JSInfo.server_address + JSInfo.info_link,
                success: function(d) {
                    for (let mount_name of JSInfo.mounts_list) {
                        if (d[mount_name]) {
                          for (let param of Object.keys(d[mount_name])) {
                            $("#jsi-"+param).html(d[mount_name][param]);
                          }
                          break;
                        }
                    }
                }
            });
            timer = setTimeout(showinfo,JSInfo.time_update*1000);
        },JSInfo.time_update*1000);
    },

};
