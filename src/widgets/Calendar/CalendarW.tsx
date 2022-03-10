import withWidget from '../../common/hoc/withWidget';
import { WidgetProps } from '../../common/util/types';
import Calendar_Date from './CalendarW_Date';
import Calendar_Month from './CalendarW_Month';

const Calendar = (props: WidgetProps) => {
    if (props.content.params.daily) return <Calendar_Date {...props} />
    return <Calendar_Month {...props} />
}

export default withWidget(Calendar);