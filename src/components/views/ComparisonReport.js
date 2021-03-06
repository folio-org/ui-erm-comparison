import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import {
  IconButton,
  Pane,
  PaneMenu,
  Paneset
} from '@folio/stripes/components';

import { AppIcon } from '@folio/stripes/core';

import ComparisonReportList from './ComparisonReportList';

const resourceCount = 200;
const ComparisonReport = ({ data, isLoading, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(resourceCount);

  const renderFirstMenu = () => {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-erm-comparisons.report.close">
          {ariaLabel => (
            <IconButton
              aria-label={ariaLabel}
              icon="times"
              id="close-report-button"
              onClick={onClose}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  };

  const handleNeedMoreData = () => {
    setCurrentIndex(data?.report?.length ?? 0);
  };

  const paneProps = {
    defaultWidth: 'fill',
    id: 'pane-report',
    onClose,
  };

  const { comparisonPointData } = data;
  const currentResources = data?.report?.slice(0, currentIndex);
  const totalCount = data?.report?.length ?? 0;

  return (
    <Paneset>
      <Pane
        appIcon={<AppIcon app="erm-comparisons" />}
        firstMenu={renderFirstMenu()}
        paneTitle={comparisonPointData?.name}
        {...paneProps}
      >
        <ComparisonReportList
          isLoading={isLoading}
          onNeedMoreData={() => setTimeout(handleNeedMoreData, 0)}
          sourceData={{ comparisonPointData, report: currentResources }}
          totalCount={totalCount}
        />
      </Pane>
    </Paneset>
  );
};

ComparisonReport.propTypes = {
  data: PropTypes.shape({
    comparisonPointData: PropTypes.object,
    report: PropTypes.arrayOf(PropTypes.object),
  }),
  isLoading: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

export default ComparisonReport;


