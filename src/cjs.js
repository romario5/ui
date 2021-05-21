import UI from './core/UI';
import Scheme from './core/Scheme';
import Styles from './core/Styles';
import EventsChannel from './core/EventsChannel';
import Localization from './core/Localization';

export default {
    UI, Scheme, Styles, EventsChannel, Localization,
    builtIn: {
        ui: {
            Button,
            Input,
            Select,
            ProgressBar,
            LabeledText,
            Spinner
        },
        extensions: {
            InputFilter
        }
    }
}