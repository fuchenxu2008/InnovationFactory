import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtCalendar } from 'taro-ui'
import dayjs from 'dayjs'
import { connect } from '@tarojs/redux'
import LoadingIndicator from '../../components/LoadingIndicator'
import { getAllPrinters, getTimeSlots, publishTimeSlots } from '../../actions/printer';
import createLoadingSelector from '../../selectors/loadingSelector'

import './index.scss'

const weekDayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

@connect(({ printer, loading }) => ({
  allPrinters: printer.allPrinters,
  isFetching: createLoadingSelector(['GET_TIMESLOTS', 'PUBLISH_TIMESLOTS'])(loading),
}), (dispatch) => ({
  getAllPrinters: () => dispatch(getAllPrinters()),
  getTimeSlots: () => dispatch(getTimeSlots()),
  publishTimeSlots: (timeSlots) => dispatch(publishTimeSlots(timeSlots)),
}))
class ManagePrinterPage extends Component {
  config = {
    navigationBarTitleText: 'Admin Printer'
  }

  state = {
    timeSlots: {},
    openDates: [],
    scheduledDates: [],
    currentSelectedDate: null,
  }

  componentDidMount() {
    // this.props.getAllPrinters();
    this.props.getTimeSlots().then((timeSlots = {}) => {
      const { available } = timeSlots;
      const { open, scheduled } = available;
      // Already open days (latest 2 weeks)
      const openDates = [].concat(...open.map(({ weekStart, weekDays }) => {
        return weekDays.map(weekDay => dayjs(weekStart.replace(/-/g, '/')).day(weekDayArr.indexOf(weekDay)).format('YYYY-MM-DD'))
      }));
      // Already scheduled days (after 2 weeks)
      const scheduledDates = [].concat(...scheduled.map(({ weekStart, weekDays }) => {
        return weekDays.map(weekDay => dayjs(weekStart.replace(/-/g, '/')).day(weekDayArr.indexOf(weekDay)).format('YYYY-MM-DD'))
      }));
      this.setState({
        timeSlots,
        openDates,
        scheduledDates,
      })
    });
  }

  _handleSelectDate = ({ value }) => {
    this.setState({ currentSelectedDate: value });
  }

  _handleScheduleDay = () => {
    this.setState((prevState) => ({
      scheduledDates: prevState.scheduledDates.concat(prevState.currentSelectedDate)
    }));
  }

  _handleCancelScheduleDay = () => {
    this.setState((prevState) => ({
      scheduledDates: prevState.scheduledDates.filter(scheduledDate => scheduledDate !== prevState.currentSelectedDate)
    }));
  }

  _handleSubmitChange = () => {
    const { timeSlots, scheduledDates } = this.state;
    const scheduledMap = scheduledDates.reduce((acc, scheduledDate) => ({
      ...acc,
      [dayjs(scheduledDate).startOf('week').format('YYYY-MM-DD')]: (acc[dayjs(scheduledDate).startOf('week').format('YYYY-MM-DD')] || []).concat(weekDayArr[dayjs(scheduledDate).day()])
    }), {});
    const updatedTimeSlots = {
      ...timeSlots,
      available: {
        ...timeSlots.available,
        scheduled: Object.keys(scheduledMap).map(weekStart => ({
          weekStart,
          weekDays: scheduledMap[weekStart]
        }))
      }
    }
    this.props.publishTimeSlots(updatedTimeSlots)
      .then(() => {
        Taro.showToast({ title: 'Success' })
      })
      .catch(err => {
        Taro.showToast({
          title: err.message,
          icon: 'none',
        })
      })
  }

  render () {
    const { isFetching } = this.props;
    const { currentSelectedDate, scheduledDates, openDates } = this.state;

    let editableStart = dayjs().format('YYYY-MM-DD');
    if (openDates.length) {
      const weekStartOfLastOpenDate = dayjs(openDates[openDates.length - 1]).startOf('week');
      editableStart = weekStartOfLastOpenDate.add(1, 'week').format('YYYY-MM-DD');
    }

    const alreadyScheduledThisDay = scheduledDates.some(scheduledDay => scheduledDay === currentSelectedDate);

    return (
      <View className='managePrinterPage'>
        {
          isFetching &&
          <LoadingIndicator />
        }
        <AtCalendar
          minDate={editableStart}
          marks={[...openDates, ...scheduledDates].map(markDate => ({ value: markDate }))}
          onDayClick={this._handleSelectDate}
        />
        {
          currentSelectedDate &&
          (
            alreadyScheduledThisDay
              ? <AtButton className='action-btn' onClick={this._handleCancelScheduleDay}>取消当前日期</AtButton>
              : <AtButton className='action-btn' onClick={this._handleScheduleDay}>规划当前日期</AtButton>
          )
        }
        <AtButton type='primary' className='action-btn' onClick={this._handleSubmitChange}>提交修改</AtButton>
      </View>
    )
  }
}

export default ManagePrinterPage
