import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { decrement, increment, incrementByAmount } from './counterSlice'

export const Counter: FC = () => {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
            aria-label="Increment value by amount"
            onClick={() => dispatch(incrementByAmount(1))}
        >
            Increase by amount
        </button>
      </div>
    </div>
  )
}