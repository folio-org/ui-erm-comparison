import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  Badge,
} from '@folio/stripes/components';

import { FormattedMessage } from 'react-intl';

export default class ComparisonPoints extends React.Component {
  static propTypes = {
    comparison: PropTypes.shape({
      comparisonPoints: PropTypes.arrayOf(PropTypes.shape({
        titleList: PropTypes.shape({
          name: PropTypes.string.isRequired
        })
      })),
    }).isRequired,
    id: PropTypes.string.isRequired
  };

  render() {
    const { comparison: { comparisonPoints = [] }, id } = this.props;

    return (
      <Accordion
        displayWhenClosed={<Badge>{comparisonPoints?.length}</Badge>}
        displayWhenOpen={<Badge>{comparisonPoints?.length}</Badge>}
        id={id}
        label={<FormattedMessage id="ui-erm-comparisons.prop.comparisonPoints" />}
      >
        <ul
          data-test-comparison-points-list
        >
          {comparisonPoints?.map((cp, index) => (
            <li
              key={`comparison-point${index}`}
              id="comparison-point"
            >
              <div data-test-comparison-point-name>
                {cp.titleList.name}
              </div>
            </li>
          ))}
        </ul>
      </Accordion>
    );
  }
}
