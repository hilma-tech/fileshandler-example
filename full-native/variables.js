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
		apiUrl: ""
	}
};

const variables = !!__DEV__ ? ENV.development : ENV.production;

export default variables;
