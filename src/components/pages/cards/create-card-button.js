// @flow

import React from 'react'
import { Tooltip, FABButton, Icon } from 'react-mdl'

const CreateCardButton = ({ onClick }: { onClick: () => void }) => (
  <div className="page-action-button create-card">
    <Tooltip label="Add Card">
      <FABButton colored ripple onClick={onClick}>
        <Icon name="add" />
      </FABButton>
    </Tooltip>
  </div>
)

export default CreateCardButton
