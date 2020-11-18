import { AuthConfig } from '@hilma/auth-mongo-nest';

export default (): AuthConfig => ({
    auth: {
        ttl: {
            Admin: 3.154e+10,
            Customer: 3.154e+10
        },

        verification_email: {
            welcome_to: "",
            verifyPath: "",
            html: null,
            text: null,
            logoDiv: null,
            logoPath: null
        },

        secretOrKey: "asdfasdfasdfasdfasdfasdf",

        accessToken_cookie: "actlt"
    },

    app_name_he: "איך קוראים לפרויקט בעברית?",

    roleAccess: {
        simple: {
            components: [
                "cats",
                "new-cat",
                "update-cat"
            ],
            defaultHomePage: "cats"
        }
    }
});