import React, { FunctionComponent, useEffect, useMemo, useState } from "react";

import { RouteInfo, TransactionFeeInfo } from "@jup-ag/react-hook";

const FeeInfo: FunctionComponent<{ route: RouteInfo }> = ({
  route,
}: {
  route: RouteInfo;
}) => {
  const fees = useMemo<TransactionFeeInfo | undefined>(() => {
    return route.fees;
  }, [route]);

  // console.log("This is the current state", state);
  return (
    <div>
      {fees && (
        <div>          
          <div>
          Signature Fee: {/* In lamports */}
          {fees.signatureFee / 10 ** 9} SOL
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeInfo;