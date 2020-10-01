import React from 'react';
import { Artwork } from '../../models/artwork';
import ArtworkCard from './artworkCard/artworkCard';
import './gallerySection.css';
import Masonry from 'react-masonry-css'

interface GallerySectionProps {
    data: Artwork[],
}

interface GallerySectionState {

}

export default class GallerySection extends React.Component<GallerySectionProps, GallerySectionState> {
    private data: Artwork[];

    constructor(props: GallerySectionProps) {
        super(props);
        this.data = props.data;

    }

    render() {
        const breakpointColumnsObj = {
            default: 4,
            1100: 3,
            700: 2,
            500: 1
        };

        return (
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">

                {this.data.map((artwork: Artwork) =>
                    <ArtworkCard key={artwork.artworkID} artwork={artwork} />
                )}
            </Masonry>
        )
    }
}
