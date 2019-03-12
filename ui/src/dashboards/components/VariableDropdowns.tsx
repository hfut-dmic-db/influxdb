// Libraries
import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'

// Components
import VariableDropdown from 'src/dashboards/components/VariableDropdown'

// Styles
import 'src/dashboards/components/VariableDropdowns.scss'

// Types
import {AppState} from 'src/types/v2'
import {VariablesState} from 'src/variables/reducers'

interface OwnProps {
  dashboardID: string
}

interface StateProps {
  variables: VariablesState
}

class VariableDropdowns extends PureComponent<StateProps & OwnProps> {
  render() {
    if (_.isEmpty(this.variablesForDashboard)) {
      return (
        <div className="container-fluid full-width">
          No variables to be found!
        </div>
      )
    }

    return (
      <div className="container-fluid full-width variable-dropdown-toolbar">
        {Object.keys(this.variablesForDashboard).map(variableID => {
          const initialSelected = _.get(
            this.valuesForDashboard,
            `${variableID}.selectedValue`
          )

          return (
            <VariableDropdown
              key={variableID}
              name={this.variablesForDashboard[variableID].variable.name}
              values={this.valuesForDashboard[variableID].values}
              initialSelected={initialSelected}
              onSelect={this.onSelectValue}
            />
          )
        })}
      </div>
    )
  }

  private get variablesForDashboard() {
    const {variables} = this.props.variables

    const variableIDs = Object.keys(this.valuesForDashboard)
    let variablesForDash = {}

    Object.keys(variables).forEach(variableID => {
      if (variableIDs.includes(variableID)) {
        variablesForDash[variableID] = variables[variableID]
      }
    })

    return variablesForDash
  }

  private get valuesForDashboard() {
    const {
      variables: {values},
      dashboardID,
    } = this.props
    return _.get(values, `${dashboardID}.values`)
  }

  private onSelectValue = (value: any) => {
    console.log(value)
  }
}

const mstp = (state: AppState): StateProps => {
  const {variables} = state

  return {variables}
}

export default connect(mstp)(VariableDropdowns)
