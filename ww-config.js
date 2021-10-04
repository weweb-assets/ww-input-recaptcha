export default {
    "editor": {
        "label": {
            "en": "reCAPTCHA"
        },
        icon: 'tick',
    },
    properties: {
        "theme": {
            "label": {
                "en": "Theme",
                "fr": "Theme"
            },
            "type": "TextSelect",
            "options": {
                "options": [
                    {
                        "value": "light",
                        "label": { "en": "Light" }
                    },
                    { "value": "dark", "label": { "en": "Dark" } }
                ]
            },
            defaultValue: 'light',
        },
        "size": {
            "label": {
                "en": "Size",
                "fr": "Size"
            },
            "type": "TextSelect",
            "options": {
                "options": [
                    {
                        "value": "normal",
                        "label": { "en": "Normal" }
                    },
                    { "value": "compact", "label": { "en": "Compact" } }
                ]
            },
            defaultValue: 'normal',
        },
        "name": {
            section: 'settings',
            "label": {
                "en": "Name"
            },
            "options": {
                "placeholder": "Name"
            },
            "type": "Text",
            "bindable": true,
            defaultValue: 'reCAPTCHA',
        },
        "key": {
            section: 'settings',
            "label": {
                "en": "Site Key"
            },
            "options": {
                "placeholder": "key"
            },
            "type": "Text",
            "bindable": true,
            defaultValue: '',
        },
        "sendResponse": {
            section: 'settings',
            "label": {
                "en": "Send value at form submit"
            },
            "type": "OnOff",
            defaultValue: false,
        }
    }
}
