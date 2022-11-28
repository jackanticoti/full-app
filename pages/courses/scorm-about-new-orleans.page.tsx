import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import ScormContent from '../../components/ScormContent';

function Page() {

  return (
    <div>
      <ScormContent id='fcdfe6c1-7711-48df-909b-f25e9eff8c48'/>
    </div>
  );
}

export { Page };