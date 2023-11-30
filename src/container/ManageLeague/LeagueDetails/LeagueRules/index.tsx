import { Grid, Slide, Typography } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeagueRulesById, fetchLeagueRulesByIdFailure, fetchLeagueRulesByIdSuccess } from '../actions'
import { RootState } from '../../../../utils/store/rootReducer'
import { updateLoaderState, updateToastState } from '../../../../utils/appActions/actions'
import FantasyTextField from '../../../../component/FormElements/TextFlied'
import FantasyCheckbox from '../../../../component/FormElements/Checkbox'
import { RulesDataInterface } from '../types'
import { RULES_TYPES } from '../../../../utils/constants'
import { IS_ACTIVE, RULE_VALUE } from './constants'
import { updateRulesData } from './helper'
import { checkLeagueOwnerOrNot } from '../helper'
interface Props {
  leagueId: string | null
  handleRulesUpdate: Function
  leagueOwner: number | undefined
  [key: string]: any
}
const LeagueRules = (props: Props) => {
  const dispatch = useDispatch()
  const propsState = useSelector((state: RootState) => {
    return {
      leagueRules: state.leagueDetailsReducer.rulesData,
      leagueRulesFailure: state.leagueDetailsReducer.rulesDataFailure,
    }
  })
  const [rulesByLeague, setRulesByLeague] = useState<RulesDataInterface[] | null>(null)

  useEffect(() => {
    if (props.leagueId) {
      dispatch(updateLoaderState(true))
      dispatch(fetchLeagueRulesById(props.leagueId))
      return () => {
        dispatch(fetchLeagueRulesByIdSuccess(null))
      }
    }
  }, [])
  useEffect(() => {
    if (propsState.leagueRules) {
      dispatch(updateLoaderState(false))
      setRulesByLeague(propsState.leagueRules)
    }
  }, [propsState.leagueRules])
  useEffect(() => {
    if (propsState.leagueRulesFailure) {
      dispatch(updateLoaderState(false))
      dispatch(updateToastState({ message: propsState.leagueRulesFailure.message, type: 'error' }))
      return () => {
        dispatch(fetchLeagueRulesByIdFailure(null))
      }
    }
  }, [propsState.leagueRulesFailure])
  const handleRuleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string,
    rule: RulesDataInterface,
  ) => {
    let updatedData = rulesByLeague
    if (type === RULE_VALUE) {
      updatedData = updateRulesData(rule.is_active, event.target.value, rulesByLeague, type, rule)
    } else if (type === IS_ACTIVE) {
      updatedData = updateRulesData(!rule.is_active, rule.value, rulesByLeague, type, rule)
    }
    props.handleRulesUpdate(updatedData)
    setRulesByLeague(updatedData)
  }
  return (
    <div style={{ margin: '2%' }}>
      {rulesByLeague && (
        <Typography variant='h4' component={'h2'}>
          <b>Batting</b>
        </Typography>
      )}

      {rulesByLeague &&
        rulesByLeague
          .filter((x) => x.type === RULES_TYPES.BATTING)
          .map((rule) => {
            return (
              <Grid
                key={rule.id}
                style={{ margin: '2%' }}
                container
                direction='row'
                alignItems={'center'}
                justifyContent={'center'}
                spacing={2}
              >
                <Grid item xs={11}>
                  <div>{rule.rule}</div>
                  <div>
                    <FantasyTextField
                      id={`rule${rule.id}`}
                      label=''
                      required={false}
                      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                        handleRuleChange(event, RULE_VALUE, rule)
                      }
                      value={rule.value}
                      disabled={checkLeagueOwnerOrNot(props.leagueOwner)}
                    />
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <FantasyCheckbox
                    id={`isActive${rule.id}`}
                    label=''
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                      handleRuleChange(event, IS_ACTIVE, rule)
                    }
                    value={rule.is_active}
                    disabled={checkLeagueOwnerOrNot(props.leagueOwner)}
                  />
                </Grid>
              </Grid>
            )
          })}
      {rulesByLeague && (
        <Typography variant='h4' component={'h2'}>
          <b>Bowling</b>
        </Typography>
      )}
      {rulesByLeague &&
        rulesByLeague
          .filter((x) => x.type === RULES_TYPES.BOWLING)
          .map((rule) => {
            return (
              <Grid
                key={rule.id}
                style={{ margin: '2%' }}
                container
                direction='row'
                alignItems={'center'}
                justifyContent={'center'}
                spacing={2}
              >
                <Grid item xs={11}>
                  <div>{rule.rule}</div>
                  <div>
                    <FantasyTextField
                      id={`rule${rule.id}`}
                      label=''
                      required={false}
                      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                        handleRuleChange(event, RULE_VALUE, rule)
                      }
                      value={rule.value}
                      disabled={checkLeagueOwnerOrNot(props.leagueOwner)}
                    />
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <FantasyCheckbox
                    id={`isActive${rule.id}`}
                    label=''
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                      handleRuleChange(event, IS_ACTIVE, rule)
                    }
                    value={rule.is_active}
                    disabled={checkLeagueOwnerOrNot(props.leagueOwner)}
                  />
                </Grid>
              </Grid>
            )
          })}
      {rulesByLeague && (
        <Typography variant='h4' component={'h2'}>
          <b>Fielding</b>
        </Typography>
      )}
      {rulesByLeague &&
        rulesByLeague
          .filter((x) => x.type === RULES_TYPES.FIELDING)
          .map((rule) => {
            return (
              <Grid
                key={rule.id}
                style={{ margin: '2%' }}
                container
                direction='row'
                alignItems={'center'}
                justifyContent={'center'}
                spacing={2}
              >
                <Grid item xs={11}>
                  <div>{rule.rule}</div>
                  <div>
                    <FantasyTextField
                      id={`rule${rule.id}`}
                      label=''
                      required={false}
                      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                        handleRuleChange(event, RULE_VALUE, rule)
                      }
                      value={rule.value}
                      disabled={checkLeagueOwnerOrNot(props.leagueOwner)}
                    />
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <FantasyCheckbox
                    id={`isActive${rule.id}`}
                    label=''
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                      handleRuleChange(event, IS_ACTIVE, rule)
                    }
                    value={rule.is_active}
                    disabled={checkLeagueOwnerOrNot(props.leagueOwner)}
                  />
                </Grid>
              </Grid>
            )
          })}
      {rulesByLeague && (
        <Typography variant='h4' component={'h2'}>
          <b>Awards</b>
        </Typography>
      )}
      {rulesByLeague &&
        rulesByLeague
          .filter((x) => x.type === RULES_TYPES.AWARDS)
          .map((rule) => {
            return (
              <Grid
                key={rule.id}
                style={{ margin: '2%' }}
                container
                direction='row'
                alignItems={'center'}
                justifyContent={'center'}
                spacing={2}
              >
                <Grid item xs={11}>
                  <div>{rule.rule}</div>
                  <div>
                    <FantasyTextField
                      id={`rule${rule.id}`}
                      label=''
                      required={false}
                      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                        handleRuleChange(event, RULE_VALUE, rule)
                      }
                      value={rule.value}
                      disabled={checkLeagueOwnerOrNot(props.leagueOwner)}
                    />
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <FantasyCheckbox
                    id={`isActive${rule.id}`}
                    label=''
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
                      handleRuleChange(event, IS_ACTIVE, rule)
                    }
                    value={rule.is_active}
                    disabled={checkLeagueOwnerOrNot(props.leagueOwner)}
                  />
                </Grid>
              </Grid>
            )
          })}
    </div>
  )
}

export default memo(LeagueRules)

export const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />
})
