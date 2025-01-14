import * as React from 'react';
import { useContext } from 'react';
import type { RuleProps } from 'react-querybuilder';
import { QueryBuilderDndContext } from './QueryBuilderDndContext';
import { useRuleDnD } from './hooks';

export const RuleDnD = (props: RuleProps) => {
  const rqbDndContext = useContext(QueryBuilderDndContext);

  const { canDrop, useDrag, useDrop } = rqbDndContext;
  const {
    path,
    disabled: disabledProp,
    parentDisabled,
    actions: { moveRule },
    schema: { independentCombinators },
  } = props;

  const disabled = !!parentDisabled || !!disabledProp;

  const dndRefs = useRuleDnD({
    path,
    disabled,
    independentCombinators,
    moveRule,
    useDrag: useDrag!,
    useDrop: useDrop!,
    canDrop,
  });

  const { rule: BaseRuleComponent } = rqbDndContext.baseControls;

  return (
    <QueryBuilderDndContext.Provider value={rqbDndContext}>
      <BaseRuleComponent {...props} {...dndRefs} />
    </QueryBuilderDndContext.Provider>
  );
};

RuleDnD.displayName = 'RuleDnD';
