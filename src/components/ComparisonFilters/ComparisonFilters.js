import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Accordion, AccordionSet, FilterAccordionHeader } from '@folio/stripes/components';
import { CheckboxFilter, parseFilters, deparseFilters } from '@folio/stripes/smart-components';

import ComparisonPointFilter from './ComparisonPointFilter';

const FILTERS = [
  'status',
  'result'
];

export default class ComparisonFilters extends React.Component {
  static propTypes = {
    activeFilters: PropTypes.object,
    data: PropTypes.object.isRequired,
    filterHandlers: PropTypes.object,
  };

  static defaultProps = {
    activeFilters: {
      status: [],
      result: [],
      comparisonPointOne: [],
      comparisonPointTwo: [],
    }
  };

  state = {
    status: [],
    result: [],
    comparisonPointOne: [],
    comparisonPointTwo: [],
    comparisonPointOneDisplayLabel: '',
    comparisonPointTwoDisplayLabel: '',
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};

    FILTERS.forEach(filter => {
      const values = props.data[`${filter}Values`];
      if (values.length !== state[filter].length) {
        newState[filter] = values.map(({ label }) => ({ label, value: label }));
      }
    });

    if (Object.keys(newState).length) return newState;

    return null;
  }


  renderCheckboxFilter = (name, props) => {
    const { activeFilters } = this.props;
    const groupFilters = activeFilters[name] || [];
    return (
      <Accordion
        displayClearButton={groupFilters.length > 0}
        header={FilterAccordionHeader}
        id={`filter-accordion-${name}`}
        label={<FormattedMessage id={`ui-erm-comparisons.prop.${name}`} />}
        onClearFilter={() => { this.props.filterHandlers.clearGroup(name); }}
        separator={false}
        {...props}
      >
        <CheckboxFilter
          dataOptions={this.state[name]}
          name={name}
          onChange={(group) => { this.props.filterHandlers.state({ ...activeFilters, [group.name]: group.values }); }}
          selectedValues={groupFilters}
        />
      </Accordion>
    );
  }

  renderComparisonPointFilter = (name, props) => {
    const { activeFilters } = this.props;
    const groupFilters = activeFilters[name] || [];

    return (
      <Accordion
        displayClearButton={groupFilters.length > 0}
        header={FilterAccordionHeader}
        id={`filter-accordion-${name}`}
        label={<FormattedMessage id={`ui-erm-comparisons.prop.${name}`} />}
        name={name}
        onClearFilter={() => {
          this.props.filterHandlers.clearGroup(name);
          const newState = {};
          newState[`${name}DisplayLabel`] = '';
          this.setState(newState);
        }}
        separator={false}
        {...props}
      >
        {this.state[`${name}DisplayLabel`] ?
          this.state[`${name}DisplayLabel`] :
          <ComparisonPointFilter
            onAgreementSelected={(agreement) => {
              this.props.filterHandlers.state({ ...activeFilters, [name]: agreement.id });
              const newState = {};
              newState[`${name}DisplayLabel`] = agreement.name;
              this.setState(newState);
            }}
          />
        }
      </Accordion>
    );
  }

  render() {
    console.log("PROPS: %o", this.props)
    return (
      <div data-test-checkboxfilters>
        <AccordionSet>
          {this.renderCheckboxFilter('status')}
          {this.renderCheckboxFilter('result')}
          {this.renderComparisonPointFilter('comparisonPointOne')}
        </AccordionSet>
      </div>
    );
  }
}
