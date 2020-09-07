import * as React from 'react';
import styles from './Gallery.module.scss'; 

interface Image {
    color: string;
    category: string;
    saturation: boolean;
};

interface ImageProps {
    images?: Image[];
}

interface ImageStates {
    images?: Image[];
    imagesTemp?: Image[];
    activeColor?: string;
    isSaturationDarker?: boolean;
}

const colors = ['red', 'green', 'yellow', 'blue', 'brown', 'gray', 'purple', 'pink'];

export default class Counter extends React.Component<ImageProps, ImageStates> {
    constructor(props: ImageProps) {
        super(props);
        let images = [];

        const getMyColor = () => {
            let n = (Math.random() * 0xfffff * 1000000).toString(16);
            return '#' + n.slice(0, 6);
        };
        const getCategoryOfColor = () => {
            const random = Math.floor(Math.random() * colors.length);
            return colors[random];
        }
        for (let index = 0; index < 40; index++) {
            images.push({
                color: getMyColor(),
                category: getCategoryOfColor(),
                saturation: !Math.round(Math.random())
            })
        }
        
        this.state = {
            images,
            imagesTemp: images,
            isSaturationDarker: false,
            activeColor: ''
        };
    }

    initAllImages = () => {
        const test = this.state.images?.map((image, i) => {
            return (<div key={i} className={`col-md-2 ${styles.gallery__grid}`} style={{background: image.color}}></div>) 
        })

        return test;
    }

    deleteAll = (): void => {
        this.setState({
            images: []
        })
    }

    filterByCategory = (value: any): void => {
        console.log(value)
        this.setState({
            activeColor: value
        })
        this.filter(value, this.state.isSaturationDarker);
    }

    filterSaturation(check: boolean) {
        console.log(check);
        this.setState({
            isSaturationDarker: check
        })

        this.filter(this.state.activeColor, check);
    }

    filter = (activeColor: any, isSaturationDarker: any) => {
        if (!!activeColor && isSaturationDarker === true) {
            this.setState({images: this.state.imagesTemp?.filter(
                item => item.category === activeColor && item.saturation === true
                )});
        } else if(!!activeColor && isSaturationDarker === false) {
            this.setState({images: this.state.imagesTemp?.filter(
                item => item.category === activeColor 
                )});
        } else if (!activeColor && isSaturationDarker === true) {
            this.setState({images: this.state.imagesTemp?.filter(
                item => item.saturation === true
                )});
        } else {
            this.setState({
                images: this.state.imagesTemp
            })
        }
    }

    render () {
        let colorList = colors.length > 0
            && colors.map((item, i) => {
            return (
                <option key={i} value={item}>{item}</option>
            )
        }, this);
        return (
        <div className={styles.gallery}>
            <div className={`row ${styles.gallery__filter}`}>
                <div className="col-md-4 form-group">
                    Filter
                </div>
                <div className="col-md-4 form-group">
                    <select className="form-control" onChange={(e) => this.filterByCategory(e.target.value)}>
                        <option value="">all</option>
                        {colorList}
                    </select>
                </div>
                <div className="col-md-4 form-group">
                    <label>
                        Saturation dark
                        <input
                            name="isGoing"
                            type="checkbox"
                            onChange={(e) => this.filterSaturation(e.target.checked)} />
                    </label>
                </div>
            </div>
            <div className="row">
                {this.initAllImages()}
            </div>
        </div>
        );
    }
}