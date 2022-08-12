export enum TransitionType {
	Cut = 'CUT',
	Mix = 'MIX',
	Push = 'PUSH',
	Wipe = 'WIPE',
	Slide = 'SLIDE',
	Sting = 'STING',
}

export enum TransitionTween {
	LINEAR = 'LINEAR',
	NONE = 'EASENONE',
	IN_QUAD = 'EASEINQUAD',
	OUT_QUAD = 'EASEOUTQUAD',
	IN_OUT_QUAD = 'EASEINOUTQUAD',
	OUT_IN_QUAD = 'EASEOUTINQUAD',
	IN_CUBIC = 'EASEINCUBIC',
	OUT_CUBIC = 'EASEOUTCUBIC',
	IN_OUT_CUBIC = 'EASEINOUTCUBIC',
	OUT_IN_CUBIC = 'EASEOUTINCUBIC',
	IN_QUART = 'EASEINQUART',
	OUT_QUART = 'EASEOUTQUART',
	IN_OUT_QUART = 'EASEINOUTQUART',
	OUT_IN_QUART = 'EASEOUTINQUART',
	IN_QUINT = 'EASEINQUINT',
	OUT_QUINT = 'EASEOUTQUINT',
	IN_OUT_QUINT = 'EASEINOUTQUINT',
	OUT_IN_QUINT = 'EASEOUTINQUINT',
	IN_SINE = 'EASEINSINE',
	OUT_SINE = 'EASEOUTSINE',
	IN_OUT_SINE = 'EASEINOUTSINE',
	OUT_IN_SINE = 'EASEOUTINSINE',
	IN_EXPO = 'EASEINEXPO',
	OUT_EXPO = 'EASEOUTEXPO',
	IN_OUT_EXPO = 'EASEINOUTEXPO',
	OUT_IN_EXPO = 'EASEOUTINEXPO',
	IN_CIRC = 'EASEINCIRC',
	OUT_CIRC = 'EASEOUTCIRC',
	IN_OUT_CIRC = 'EASEINOUTCIRC',
	OUT_IN_CIRC = 'EASEOUTINCIRC',
	IN_ELASTIC = 'EASEINELASTIC',
	OUT_ELASTIC = 'EASEOUTELASTIC',
	IN_OUT_ELASTIC = 'EASEINOUTELASTIC',
	OUT_IN_ELASTIC = 'EASEOUTINELASTIC',
	IN_BACK = 'EASEINBACK',
	OUT_BACK = 'EASEOUTBACK',
	IN_OUT_BACK = 'EASEINOUTBACK',
	OUT_IN_BACK = 'EASEOUTINTBACK',
	OUT_BOUNCE = 'EASEOUTBOUNCE',
	IN_BOUNCE = 'EASEINBOUNCE',
	IN_OUT_BOUNCE = 'EASEINOUTBOUNCE',
	OUT_IN_BOUNCE = 'EASEOUTINBOUNCE',
}

export enum Direction {
	Left = 'LEFT',
	Right = 'RIGHT',
}

export enum LogLevel {
	Trace = 'trace',
	Debug = 'debug',
	Info = 'info',
	Warning = 'warning',
	Error = 'error',
	Fatal = 'fatal',
}

export enum LogCategory {
	Calltrace = 'calltrace',
	Communication = 'communication',
}

export enum SetVariable {
	Mode = 'MODE',
	Channel_layout = 'CHANNEL_LAYOUT',
}

export enum LockAction {
	Acquire = 'ACQUIRE',
	Release = 'RELEASE',
	Clear = 'CLEAR',
}

export enum BlendMode {
	Normal = 'NORMAL',
	Lighten = 'LIGHTEN',
	Darken = 'DARKEN',
	Multiply = 'MULTIPLY',
	Average = 'AVERAGE',
	Add = 'ADD',
	Subtract = 'SUBTRACT',
	Difference = 'DIFFERENCE',
	Negation = 'NEGATION',
	Exclusion = 'EXCLUSION',
	Screen = 'SCREEN',
	Overlay = 'OVERLAY',
	SoftLight = 'SOFT LIGHT',
	HardLight = 'HARD LIGHT',
	ColorDodge = 'COLOR DODGE',
	ColorBurn = 'COLOR BURN',
	LinearDodge = 'LINEAR DODGE',
	LinearBurn = 'LINEAR BURN',
	LinearLight = 'LINEAR LIGHT',
	VividLight = 'VIVID LIGHT',
	PinLight = 'PIN LIGHT',
	HardMix = 'HARD MIX',
	Reflect = 'REFLECT',
	Glow = 'GLOW',
	Phoenix = 'PHOENIX',
	Contrast = 'CONTRAST',
	Saturation = 'SATURATION',
	Color = 'COLOR',
	Luminosity = 'LUMINOSITY',
}

export enum RouteMode {
	Background = 'BACKGROUND',
	Next = 'NEXT',
}
