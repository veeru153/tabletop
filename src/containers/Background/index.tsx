import classes from './Background.module.scss';
import Images from './Images';
import Video from './Video';
import { useRecoilValue } from 'recoil';
import { bgAtom } from '../../common/atoms/config';

// Handles background images and videos provided by the user
const Background = () => {
    const bg = useRecoilValue(bgAtom);

    return (
        <div className={classes.Background} style={{ backgroundColor: bg.color }}>
            {bg.type !== 0 ? ((bg.type === 1 || !navigator.onLine) ? 
                <Images blend={bg.blend} local={bg.image} /> : 
                <Video />) : <div></div>
            }
        </div>
    )
}

export default Background;