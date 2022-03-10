import { WidgetProps } from '../../common/util/types';
import ClockAnalog from './ClockW_Analog';
import ClockDigital from './ClockW_Digital';
import withWidget from '../../common/hoc/withWidget';

const Clock = (props : WidgetProps) => {
    if(props.content.params.digital) return <ClockDigital {...props} />
    return <ClockAnalog {...props} />
}

export default withWidget(Clock);