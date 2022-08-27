import React from "react"
import Link from "next/link"
import { TokenIcon, TokenName, TokenSymbol, TokenPrice } from '@utils/tokenList'

const DefiCard = (props: { address: any, defiDescription: string }) => {
    return(
        <Link href={`/defi/` + props.address}>
            <div className="grid grid-cols-1 grid-rows-2 p-3 rounded-xl border cursor-pointer">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-between">
                        <div className="w-12 h-12 mr-2">
                            <TokenIcon mint={props.address} />
                        </div>
                        <div className="">
                            <p className="font-semibold text-sm">
                                <TokenSymbol mint={props.address} />
                            </p>
                            <p className="font-base text-sm">
                                <TokenName mint={props.address} />
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="font-base text-sm">
                            ${<TokenPrice mintAddress={props.address} />}
                        </p>
                    </div>
                </div>
                <div className="text-xs my-2.5">
                    {props.defiDescription}
                </div>
            </div>
        </Link>
    )
}

export default DefiCard;