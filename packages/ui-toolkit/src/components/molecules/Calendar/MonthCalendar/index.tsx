import React from 'react';
import cn from 'classnames';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@groww-tech/icon-store/mi';

import './styles/index.css';

const MONTHS = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

class MonthCalendar extends React.PureComponent<Props, State> {
  // Default props for the component
  static defaultProps = {
    currentDate: new Date(),
    minMonth: null,
    maxMonth: null,
    onDateChange: (date: Date) => {}
  };


  constructor(props: Props) {
    super(props);
    const { currentDate, maxMonth } = props;

    // Initialize state with dateToShow, considering maxMonth if provided
    if (maxMonth) {
      this.state = {
        dateToShow: currentDate > maxMonth ? maxMonth : currentDate
      };
    }
  }

  // Initial state

  state: State = {
    dateToShow: this.props.currentDate
  };

  // Update state if currentDate prop changes

  componentDidUpdate(prevProps: Props) {
    if (prevProps.currentDate.getTime() !== this.props.currentDate.getTime()) {
      this.setState({
        dateToShow: this.props.currentDate
      });
    }
  }


  render() {
    const { dateToShow } = this.state;
    const { currentDate } = this.props;

    const isPreviousYearDisabled = this.isPreviousYearDisabled();
    const isNextYearDisabled = this.isNextYearDisabled();

    // Get the index of the current month
    const currentMonthIndex = currentDate.getMonth();

    return (
      <div className="contentPrimary">
        <div className="card borderPrimary mn12Box">
          <div className="valign-wrapper mn12YearRow">
            <div
              className={
                cn('valign-wrapper', { ' cur-po': !isPreviousYearDisabled }, {
                  'contentSecondary cur-no': isPreviousYearDisabled
                })
              }
              onClick={() => this.handlePrevYearClick(isPreviousYearDisabled)}
            >
              <KeyboardArrowLeft className="mn12YearIcon" />
            </div>
            <div>{dateToShow.getFullYear()}</div>
            <div
              className={
                cn('valign-wrapper', { 'cur-po': !isNextYearDisabled }, {
                  'contentSecondary cur-no': isNextYearDisabled
                })
              }
              onClick={() => this.handleForwardYearClick(isNextYearDisabled)}
            >
              <KeyboardArrowRight className="mn12YearIcon" />
            </div>
          </div>
          <div className="valign-wrapper mn12MonthBox">
            {              // Render each month

              MONTHS.map((month, index) => (
                <div className="mn12Month"
                  key={`${dateToShow?.getTime()}${index}`}
                >
                  <div
                    className={
                      cn('mn12MonthText valign-wrapper cur-po bodyBase', {
                        'mn12MonthTextSelected backgroundAccent contentInversePrimary':
                        index === currentMonthIndex &&
                        currentDate.getFullYear() === dateToShow.getFullYear(),
                        'mn12MonthBackHover':
                        !(
                          index === currentMonthIndex &&
                          currentDate.getFullYear() === dateToShow.getFullYear()
                        ),
                        'cc12DisableDate': this.isMonthDisabled(index)
                      })
                    }
                    onClick={() => this.onMonthClick(index)}
                  >
                    {month}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }

  // Handle month click event

  onMonthClick = (index: number) => {
    const { dateToShow } = this.state;
    const newDate = new Date(dateToShow.getFullYear(), index, 1);

    if (this.isMonthDisabled(index)) {
      return;
    }

    this.props.onDateChange(newDate);
    this.setState({
      dateToShow: newDate
    });
  };

  // Handle previous year click event
  handlePrevYearClick = (isPreviousYearDisabled:boolean) => {
    if (isPreviousYearDisabled) {
      return;
    }

    const { dateToShow } = this.state;
    const newDate = new Date(dateToShow.getFullYear() - 1, dateToShow.getMonth(), 1);

    this.setState({ dateToShow: newDate });
  };


  // Handle next year click event
  handleForwardYearClick = (isNextYearDisabled:boolean) => {
    if (isNextYearDisabled) {
      return;
    }

    const { dateToShow } = this.state;
    const newDate = new Date(dateToShow.getFullYear() + 1, dateToShow.getMonth(), 1);

    this.setState({ dateToShow: newDate });
  };

  // Check if a month is disabled based on minMonth and maxMonth props

  isMonthDisabled = (monthIndex: number): boolean => {
    const { dateToShow } = this.state;
    const { minMonth, maxMonth } = this.props;
    const currentDate = new Date(dateToShow.getFullYear(), monthIndex, 1);

    if ((this.compareMonth(minMonth, currentDate)) ||
          (this.compareMonth(currentDate, maxMonth))) {
      return true;
    }

    return false;
  };

  // Check if the previous year button should be disabled

  isPreviousYearDisabled = (): boolean => {
    const { dateToShow } = this.state;
    const { minMonth } = this.props;

    if (minMonth) {
      return dateToShow.getFullYear() - 1 < minMonth.getFullYear();
    }

    return false;
  };

  // Check if the next year button should be disabled

  isNextYearDisabled = (): boolean => {
    const { dateToShow } = this.state;
    const { maxMonth } = this.props;

    if (maxMonth) {
      return dateToShow.getFullYear() + 1 > maxMonth.getFullYear();
    }

    return false;
  };

  // Compare two dates by year and month

  compareMonth = (dateOne: Date | null | undefined, dateTwo: Date | null | undefined): boolean => {
    if (!dateOne || !dateTwo) return false;
    const yearDiff = dateOne.getFullYear() - dateTwo.getFullYear();

    if (yearDiff !== 0) return yearDiff > 0;
    return dateOne.getMonth() > dateTwo.getMonth();
  };
}


type Props = {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  minMonth?: Date | null;
  maxMonth?: Date | null;
};


type State = {
  dateToShow: Date;
};

export default MonthCalendar;
