    import Constants from 'expo-constants';
import { Platform } from 'react-native';

const { manifest } = Constants;

let localIP = Platform.select({
	web: () => `127.0.0.1`,
	default: () => `${manifest && manifest.debuggerHost && manifest.debuggerHost.split(':').shift()}`
})();

const ENV = {
	development: {
		apiUrl: `http://${localIP}:8080`
	},
	production: {
		apiUrl: "http://10.0.0.16:8080"
	}
};

const variables = !!__DEV__ ? ENV.development : ENV.production;

export default variables;
