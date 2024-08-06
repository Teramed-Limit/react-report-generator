export interface FontSource {
	src: string;
	fontWeight: 'normal' | 'bold';
}

export interface FontFamily {
	family: string;
	fontStyle?: 'normal';
	fontWeight?: 'normal';
	fonts: FontSource[];
}
