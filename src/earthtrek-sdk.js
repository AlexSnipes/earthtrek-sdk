import rp from 'request-promise';
import config from './config';

export default class EarthTrekSDK {

    /**
     *
     * @param options
     */
    constructor(options) {
        if (options.username == undefined) {
            throw Error("Username is required");
        }
        if (options.token == undefined) {
            throw Error("Token is required");
        }
        if (options.apiUrl == undefined) {
            options.apiUrl = config.api.url;
        }
        this.apiUrl = options.apiUrl;
    }

    getSatelliteIds () {
        if (satelliteIds != null) {
            return satelliteIds;
        }
        this.getSatellites().then(function (satellites) {
            let satIds = [];
            satellites.data.forEach(function (satellite) {
                satIds.push(satellite.satId);
            })
            satelliteIds = satIds;
            return satIds;
        });
    }

    /**
     * get Satellites
     */
    getSatellites() {
        const options = {
            uri: this.apiUrl + config.api.satellites.endpoint,
            json: true,
            /*headers: {
                'EarthTrek-Username': EARTHTREK_USERNAME,
                'EarthTrek-Token': EARTHTREK_TOKEN
            }*/
        };
        return rp(options);
    }

    /**
     * Get Satellites TLEs
     * @param ids
     * @param options
     */
    getTLEs(ids, options) {
        let qs = {};
        qs.ids = ids.join(',');
        if (options.startDate) {
            let startDate = options.startDate;

            if (!(startDate instanceof Date)) {
                startDate = new Date(startDate);
                startDate.setDate(startDate.getDate());
            }

            if (startDate instanceof Date) {
                startDate = startDate.getUTCFullYear() + '-' + (startDate.getUTCMonth() + 1) + '-' + startDate.getUTCDate();
            }
            qs.startDate = startDate;
            if (options.endDate) {
                let endDate = options.endDate;
                if (endDate instanceof Date) {
                    endDate = endDate.getUTCFullYear() + '-' + (endDate.getUTCMonth() + 1) + '-' + endDate.getUTCDate();
                }
            }
            qs.endDate = endDate;
        }
        const fields = (!options.fields) ? config.api.tle.fields : options.fields;
        qs.fields = fields;
        qs.extended = true;
        return rp({
            uri: this.apiUrl + config.api.tle.endpoint,
            qs: qs,
            json: true
        });
    }
}