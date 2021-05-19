declare module Highland { 
	interface Stream<R>{
		splitBy(delimiter: string|RegExp): Stream<R>;
	}
}