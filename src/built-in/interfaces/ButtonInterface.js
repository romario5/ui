import Interface from '../../core/Interface';

export default class ButtonInterface extends Interface
{
    getText() {}
    setText(value) {}
    getType() {}
    setType(type) {}
    onClick(handler) {}
    onMouseUp(handler) {}
    onMouseDown(handler) {}
    onMouseOver(handler) {}
    onMouseOut(handler) {}
    isDisabled() {}
    disable() {}
    enable() {}
}