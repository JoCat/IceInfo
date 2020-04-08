/*
 IceInfo v.2.0.2 - Informer for Site (Icecast2 Online Radio)
 Copyright (c) 2016-2020 Andrew Molchanov
 https://github.com/JoCat/IceInfo
*/
IceInfo = {
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
        this.showinfo();
    },

    showinfo() {
        this.request(this.server_address + this.info_link, (data) => {
            for (let mount_name of this.mounts_list) {
                if (data[mount_name]) {
                    for (let param of Object.keys(data[mount_name])) {
                        if (document.getElementById('iceinfo-'+param)) {
                            document.getElementById('iceinfo-'+param).innerHTML = data[mount_name][param];
                        }
                    }
                    break;
                }
            }
        });
        this.timer = setTimeout(() => {this.showinfo()}, this.time_update*1000);
    },

    request(url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response);
            callback(data);
          }
        };
        request.send();
    }
};