import { memo, SVGProps } from 'react';
import './PokeBall.css'

export interface PokeBallProps extends SVGProps<SVGSVGElement> {
    isFetching: boolean
    isResolved?: boolean
    loadingMessage?: string

}

const defaultProps: PokeBallProps = {
    isFetching: true,
    isResolved: false,
    loadingMessage: 'Loading ...'
}

const PokeBall: React.FC<PokeBallProps> = (props: PokeBallProps = defaultProps) => {

    const { isFetching, isResolved, loadingMessage } = props

    return (
        <div className='flex justify-center items-center'>
            <svg viewBox="0 0 100 100" {...props} className={`ballanim ${isFetching && 'fetching'} ${(isResolved || !isFetching) && 'failure hide'} ${' ' + props.className}`}>
                <g transform="translate(50 50) scale(0.8)">
                    <g transform="translate(0 50)">
                        <g className={`${isFetching && 'gravity'}`}>
                            <g transform="translate(0 -50)">
                                <g className="ball" transform="scale(1 1)">
                                    <g className="bottom">
                                        <path fill="#ffffff" stroke="#303030" strokeWidth="5" d="M -47.5 0 a 47.5 47.5 0 0 0 95 0z"></path></g>
                                    <g className="top">
                                        <path fill="#f15d5f" d="M -47.5 0 a 47.5 47.5 0 0 1 95 0"></path>
                                        <path
                                            fill="none"
                                            stroke="#ffffff"
                                            strokeWidth="5"
                                            strokeLinecap="round"
                                            strokeDasharray="0 15 9 9 20 100"
                                            d="M -38 -0 a 38 38 0 0 1 76 0"
                                        ></path>
                                        <path
                                            fill="none"
                                            stroke="#303030"
                                            strokeWidth="5"
                                            d="M -47.5 0 a 47.5 47.5 0 0 1 95 0z"
                                        ></path>
                                    </g>
                                    <g className="open" transform="scale(1 0)">
                                        <path
                                            fill="#303030"
                                            stroke="#303030"
                                            strokeWidth="5"
                                            strokeLinejoin="round"
                                            d="M -47.5 -10 a 190 190 0 0 1 95 0 a 190 190 0 0 1 -95 0"
                                        ></path>
                                        <path
                                            fill="#303030"
                                            stroke="#303030"
                                            strokeWidth="5"
                                            strokeLinejoin="round"
                                            d="M -47.5 5 a 160 160 0 0 0 95 0 a 180 180 0 0 0 -95 0"
                                        ></path>
                                    </g>
                                    <g className="center">
                                        <circle
                                            fill="#ffffff"
                                            stroke="#303030"
                                            strokeWidth="5"
                                            cx="0"
                                            cy="0"
                                            r="12"
                                        ></circle>
                                        <circle
                                            fill="#ffffff"
                                            stroke="#303030"
                                            strokeWidth="3"
                                            cx="0"
                                            cy="0"
                                            r="6"
                                        ></circle>
                                        <g className="inner" opacity="0">
                                            <circle
                                                fill="#f15d5f"
                                                cx="0"
                                                cy="0"
                                                r="4.5"
                                            ></circle>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
            <span className={`${(isResolved || !isFetching) && 'hide'}`}>
                {loadingMessage}
            </span>
        </div>
    );
};

export default memo(PokeBall);