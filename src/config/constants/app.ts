const APP_NAME = 'Rack';
const APP_VERSION = '1.0.0';

const enum InputType {
    TEXT = 'text',
    BUTTON = 'button',
    SUBMIT = 'submit',
    RADIO = 'radio',
    TEL = 'tel',
    PASSWORD = 'password',
    CHECKBOX = 'checkbox',
    COLOR = 'color',
    TIME = 'time',
    DATE = 'date',
    DATE_TIME_LOCALE = 'datetime-local',
    EMAIL = 'email',
    FILE = 'file',
    HIDDEN = 'hidden',
    IMAGE = 'image',
    MONTH = 'month',
    NUMBER = 'number',
    RANGE = 'range',
    RESET = 'rest',
    SEARCH = 'search',
    URL = 'url',
    WEEK = 'week'
}

const enum Placement {
    HORIZONTAL = 'horizontal',
    VERTICAL = 'vertical'
}

const enum Direction {
    LEFT = 'left',
    RIGHT = 'right',
    TOP = 'top',
    BOTTOM = 'bottom'
}

const enum Shape {
    FLAT = 'flat',
    ROUNDED = 'rounded'
}

// exports
export {
    APP_NAME,
    APP_VERSION,
    InputType,
    Placement,
    Direction,
    Shape
};
