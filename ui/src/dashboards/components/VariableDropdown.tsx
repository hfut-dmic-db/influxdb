// Libraries
import React, {PureComponent} from 'react'
import {Dropdown} from 'src/clockface'

// Styles
import 'src/dashboards/components/VariableDropdowns.scss'

interface Props {
  name: string
  values: any //todo
  initialSelected: any // todo
  onSelect: (value: any) => void // todo
}

interface State {
  selectedValue: any // todo
}

class VariableDropdown extends PureComponent<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      selectedValue: this.props.initialSelected,
    }
  }

  render() {
    const {name, onSelect} = this.props
    const {selectedValue} = this.state

    return (
      <div className="variable-dropdown-container">
        <div className="variable-label"> {name} </div>
        <Dropdown
          selectedID={selectedValue}
          onChange={onSelect}
          widthPixels={200}
          customClass="variable-dropdown"
        >
          {this.dropdownItems}
        </Dropdown>
      </div>
    )
  }

  private get dropdownItems(): JSX.Element[] {
    const {values} = this.props

    return values.map(v => {
      return (
        <Dropdown.Item key={v} id={v}>
          {v}
        </Dropdown.Item>
      )
    })
  }
}

export default VariableDropdown
