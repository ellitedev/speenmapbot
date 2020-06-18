const axios = require('axios');

class SSAPI {
    constructor(isDev) {
        if(isDev) {
            this.apiBase = "http://localhost/www/spinshare/server/public/index.php/api/";
        } else {
            this.apiBase = "https://spinsha.re/api/";
        }
        this.supportedVersion = 1;
    }

    async ping() {
        let apiPath = this.apiBase + "ping";
        let supportedVersion = this.supportedVersion;

        return axios.get(apiPath)
        .then(function(response) {
            if(response.data.version !== supportedVersion) {
                throw new Error("Client is outdated!");
            }

            return response.data.data;
        }).catch(function(error) {
            throw new Error(error);
        });
    }

    async getStreamStatus() {
        let apiPath = this.apiBase + "streamStatus";
        let supportedVersion = this.supportedVersion;

        return axios.get(apiPath)
        .then(function(response) {
            if(response.data.version !== supportedVersion) {
                throw new Error("Client is outdated!");
            }

            return response.data.data;
        }).catch(function(error) {
            throw new Error(error);
        });
    }

    async getLatestVersion() {
        let apiPath = this.apiBase + "latestVersion/" + process.platform;
        let supportedVersion = this.supportedVersion;

        return axios.get(apiPath)
        .then(function(response) {
            if(response.data.version !== supportedVersion) {
                throw new Error("Client is outdated!");
            }

            return response.data.data;
        }).catch(function(error) {
            throw new Error(error);
        });
    }

    async getPromos() {
        let apiPath = this.apiBase + "promos";
        let supportedVersion = this.supportedVersion;

        return axios.get(apiPath)
        .then(function(response) {
            if(response.data.version !== supportedVersion) {
                throw new Error("Client is outdated!");
            }
            
            return response.data.data;
        }).catch(function(error) {
            throw new Error(error);
        });
    }

    async getLatestVersion() {
        let apiPath = this.apiBase + "latestVersion/" + process.platform;
        let supportedVersion = this.supportedVersion;

        return axios.get(apiPath)
        .then(function(response) {
            if(response.data.version !== supportedVersion) {
                throw new Error("Client is outdated!");
            }
            
            return response.data.data;
        }).catch(function(error) {
            throw new Error(error);
        });
    }

    async getNewSongs(_offset) {
        let apiPath = this.apiBase + "songs/new/" + _offset;
        let supportedVersion = this.supportedVersion;

        return axios.get(apiPath)
        .then(function(response) {
            if(response.data.version !== supportedVersion) {
                throw new Error("Client is outdated!");
            }
            
            return response.data.data;
        }).catch(function(error) {
            throw new Error(error);
        });
    }

    async getHotSongs(_offset) {
        let apiPath = this.apiBase + "songs/hot/" + _offset;
        let supportedVersion = this.supportedVersion;

        return axios.get(apiPath)
        .then(function(response) {
            if(response.data.version !== supportedVersion) {
                throw new Error("Client is outdated!");
            }
            
            return response.data.data;
        }).catch(function(error) {
            throw new Error(error);
        });
    }

    async getPopularSongs(_offset) {
        let apiPath = this.apiBase + "songs/popular/" + _offset;
        let supportedVersion = this.supportedVersion;

        return axios.get(apiPath)
        .then(function(response) {
            if(response.data.version !== supportedVersion) {
                throw new Error("Client is outdated!");
            }
            
            return response.data.data;
        }).catch(function(error) {
            throw new Error(error);
        });
    }

    async getSongDetail(_songId) {
        let apiPath = this.apiBase + "song/" + _songId;
        let supportedVersion = this.supportedVersion;

        return axios.get(apiPath)
        .then(function(response) {
            if(response.data.version !== supportedVersion) {
                throw new Error("Client is outdated!");
            }
            
            return response.data;
        }).catch(function(error) {
            throw new Error(error);
        });
    }

    async getSongDetailReviews(_songId) {
        let apiPath = this.apiBase + "song/" + _songId + "/reviews";
        let supportedVersion = this.supportedVersion;

        return axios.get(apiPath)
        .then(function(response) {
            if(response.data.version !== supportedVersion) {
                throw new Error("Client is outdated!");
            }
            
            return response.data;
        }).catch(function(error) {
            throw new Error(error);
        });
    }

    async getSongDetailSpinPlays(_songId) {
        let apiPath = this.apiBase + "song/" + _songId + "/spinplays";
        let supportedVersion = this.supportedVersion;

        return axios.get(apiPath)
        .then(function(response) {
            if(response.data.version !== supportedVersion) {
                throw new Error("Client is outdated!");
            }
            
            return response.data;
        }).catch(function(error) {
            throw new Error(error);
        });
    }

    async getUserDetail(_userId) {
        let apiPath = this.apiBase + "user/" + _userId;
        let supportedVersion = this.supportedVersion;

        return axios.get(apiPath)
        .then(function(response) {
            if(response.data.version !== supportedVersion) {
                throw new Error("Client is outdated!");
            }
            
            return response.data;
        }).catch(function(error) {
            throw new Error(error);
        });
    }

    async searchAll() {
        let apiPath = this.apiBase + "searchAll";
        let supportedVersion = this.supportedVersion;

        return axios.get(apiPath)
        .then(function(response) {
            if(response.data.version !== supportedVersion) {
                throw new Error("Client is outdated!");
            }
            
            return response.data;
        }).catch(function(error) {
            throw new Error(error);
        });
    }

    async search(_searchQuery) {
        let apiPath = this.apiBase + "search/" + _searchQuery;
        let supportedVersion = this.supportedVersion;

        return axios.get(apiPath)
        .then(function(response) {
            if(response.data.version !== supportedVersion) {
                throw new Error("Client is outdated!");
            }
            
            return response.data;
        }).catch(function(error) {
            throw new Error(error);
        });
    }
}

module.exports = SSAPI;
