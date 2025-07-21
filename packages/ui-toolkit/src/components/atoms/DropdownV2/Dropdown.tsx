import React, { cloneElement } from 'react';
import { findDOMNode } from 'react-dom';

import cx from 'classnames';

import './dropDown.css';
import DropdownContentV2 from './DropdownContent';
import DropdownTriggerV2 from './DropdownTrigger';

class DropdownV2 extends React.PureComponent<Props, State> {
  static defaultProps: DefaultProps;


  private dropdownRef: React.RefObject<HTMLDivElement>;


  constructor(props: Props) {
    super(props);

    this.dropdownRef = React.createRef();
    this.state = {
      active: false,
      position: 'bottom',
      horizontalPosition: 'right'
    };
  }


  componentDidMount() {
    document.addEventListener('click', this._onWindowClick);
    document.addEventListener('touchstart', this._onWindowClick);
    document.addEventListener('keydown', this._onKeyDownHandler);
  }


  componentWillUnmount() {
    document.removeEventListener('click', this._onWindowClick);
    document.removeEventListener('touchstart', this._onWindowClick);
    document.removeEventListener('keydown', this._onKeyDownHandler);
  }


  componentDidUpdate(_prevProps: Props, prevState: State) {
    // Calculate position when dropdown becomes active
    if (this.state.active && !prevState.active) {
      requestAnimationFrame(this._calculatePosition);
    }
  }


  _calculatePosition = () => {
    if (!this.state.active || !this.dropdownRef.current) {
      return;
    }

    const dropdownElement = this.dropdownRef.current;
    const triggerElement = dropdownElement.querySelector('.dropdown-v2--trigger');

    if (!triggerElement) {
      return;
    }

    const triggerRect = triggerElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Estimate dropdown content dimensions
    const contentElement = dropdownElement.querySelector('.dropdown-v2--content');
    let estimatedDropdownHeight = 200; // Default estimate
    let estimatedDropdownWidth = 250; // Default estimate

    if (contentElement) {
      const contentRect = contentElement.getBoundingClientRect();

      estimatedDropdownHeight = Math.max(contentRect.height, 150); // Minimum reasonable height
      estimatedDropdownWidth = Math.max(contentRect.width, 200); // Minimum reasonable width
    }

    const margin = 16; // Safety margin

    // Vertical positioning calculations
    const spaceBelow = viewportHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const verticalNeedsSpace = estimatedDropdownHeight + margin;

    // Horizontal positioning calculations
    const spaceRight = viewportWidth - triggerRect.left;
    const spaceLeft = triggerRect.right;
    const horizontalNeedsSpace = estimatedDropdownWidth + margin;

    // Smart vertical positioning logic
    let newPosition: 'top' | 'bottom' = 'bottom';

    if (spaceBelow >= verticalNeedsSpace) {
      newPosition = 'bottom';

    } else if (spaceAbove >= verticalNeedsSpace) {
      newPosition = 'top';

    } else {
      // Not enough space in either direction, choose the larger space
      newPosition = spaceAbove > spaceBelow ? 'top' : 'bottom';
    }

    // Smart horizontal positioning logic
    let newHorizontalPosition: 'left' | 'right' = 'right';

    if (spaceRight >= horizontalNeedsSpace) {
      newHorizontalPosition = 'right';

    } else if (spaceLeft >= horizontalNeedsSpace) {
      newHorizontalPosition = 'left';

    } else {
      // Not enough space in either direction, choose the larger space
      newHorizontalPosition = spaceRight > spaceLeft ? 'right' : 'left';
    }

    const shouldUpdate = newPosition !== this.state.position || newHorizontalPosition !== this.state.horizontalPosition;

    if (shouldUpdate) {
      this.setState({
        position: newPosition,
        horizontalPosition: newHorizontalPosition
      });
    }
  };


  render() {
    const { children, className, disabled, removeElement } = this.props;
    // create component classes
    const active = this.isActive();
    const dropdownClasses = cx({
      'dropdown-v2': true,
      'dropdown-v2--active': active,
      'dropdown-v2--disabled': disabled,
      'dropdown-v2--position-top': this.state.position === 'top',
      'dropdown-v2--position-bottom': this.state.position === 'bottom',
      'dropdown-v2--position-left': this.state.horizontalPosition === 'left',
      'dropdown-v2--position-right': this.state.horizontalPosition === 'right'
    });

    // stick callback on trigger element
    const boundChildren = React.Children.map(children, child => {
      if (!React.isValidElement<EnrichedChildren>(child)) {
        return child;
      }

      if (child.type === DropdownTriggerV2) {
        const originalOnClick = child.props.onClick;

        child = cloneElement(child, {
          // ref: 'trigger',
          onClick: (event: MouseEvent) => {
            if (!disabled) {
              this._onToggleClick(event);
              if (originalOnClick) {
                originalOnClick.apply(child, originalOnClick.arguments);
              }
            }
          }
        });

      } else if (child.type === DropdownContentV2 && removeElement && !active) {
        child = <></>;

      } else if (child.type === DropdownContentV2) {
        // Pass position information to DropdownContent
        child = cloneElement(child, {
          ...child.props,
          position: this.state.position,
          horizontalPosition: this.state.horizontalPosition
        });
      }

      return child;
    });

    const cleanProps = { ...this.props };

    delete cleanProps.active;
    delete cleanProps.onShow;
    delete cleanProps.onHide;
    delete cleanProps.removeElement;

    return (
      <div
        {...cleanProps}
        ref={this.dropdownRef}
        className={`${dropdownClasses} ${className}`}
        data-position={this.state.position}
        data-horizontal-position={this.state.horizontalPosition}
        style={{ ...cleanProps.style, position: 'relative' }}
      >
        {boundChildren}
      </div>
    );
  }


  isActive = () => {
    return (typeof this.props.active === 'boolean')
      ? this.props.active
      : this.state.active;
  }


  hide = () => {
    this.setState({
      active: false
    }, () => {
      if (this.props.onHide) {
        this.props.onHide();
      }
    });
  }


  show = () => {
    this.setState({
      active: true
    }, () => {
      if (this.props.onShow) {
        this.props.onShow();
      }

      // Calculate position after showing using requestAnimationFrame for better DOM readiness
      requestAnimationFrame(this._calculatePosition);
    });
  }


  _onWindowClick = (event: MouseEvent | TouchEvent) => {
    const dropdownElement = findDOMNode(this);

    if (event.target !== dropdownElement && !dropdownElement?.contains(event.target as Node) && this.isActive()) {
      this.hide();
    }
  }


  _onToggleClick = (event: MouseEvent) => {
    event.preventDefault();
    if (this.isActive()) {
      this.hide();

    } else {
      this.show();
    }
  }


  _onKeyDownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.isActive()) {
      this.hide();
    }
  }
}

DropdownV2.defaultProps = {
  className: ''
} as DefaultProps;


type EnrichedChildren = {
  onClick: (e: MouseEvent) => void;
  children?: React.ReactNode;
  position?: 'top' | 'bottom';
  horizontalPosition?: 'left' | 'right';
}


type State = {
  active: boolean;
  position: 'top' | 'bottom';
  horizontalPosition: 'left' | 'right';
}


type RequiredProps = {
  children: React.ReactChild | React.ReactChild[];
}


type DefaultProps = {
  className: string;
}

export type Props = RequiredProps & DefaultProps & {
  disabled?: boolean;
  active?: boolean;
  onHide?: () => void;
  onShow?: () => void;
  removeElement?: boolean;
  style?: React.CSSProperties;
};

export { DropdownTriggerV2, DropdownContentV2 };
export default DropdownV2;
