import UI from './core/UI';
import Scheme from './core/Scheme';
import Styles from './core/Styles';
import EventsChannel from './core/EventsChannel';
import Localization from './core/Localization';
import Spinner from './built-in/ui/Spinner';
import Button from './built-in/ui/Button';
import Input from './built-in/ui/Input';
import Select from './built-in/ui/Select';
import ProgressBar from './built-in/ui/ProgressBar';
import LabeledText from './built-in/ui/LabeledText';
import InputFilter from './built-in/extensions/InputFilter';


window.UIScheme = {
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
