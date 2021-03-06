import React from 'react'
import { connect } from 'react-redux'
import { MsgLevel } from 'utils/enums'
import i18next from 'i18next'

class LogCenter extends React.Component {
  getTrClass (n) {
    let cssClass = ''
    switch (n.type) {
      case MsgLevel.info:
        cssClass = 'table-info'
        break
      case MsgLevel.error:
        cssClass = 'table-danger'
        break
      case MsgLevel.success:
        cssClass = 'table-success'
        break
      case MsgLevel.warning:
        cssClass = 'table-warning'
        break
    }
    return cssClass
  }

  readableDate (ts) {
    const d = new Date(ts)
    return d.toLocaleString()
  }

  render () {
    const n = []
    this.props.logs.forEach(e => {
      if (typeof e !== 'undefined') {
        n.push(
          <tr className={this.getTrClass(e) + ' log-entry'} key={e.ts}>
            <td>{this.readableDate(e.ts)}</td>
            <td>{e.emitter}</td>
            <td>{e.type}</td>
            <td>{e.content}</td>
          </tr>
        )
      }
    })
    return (
      <>
        <div className='row' key='content'>
          <div className='col'>
            <table className='table table-sm table-striped'>
              <thead>
                <tr>
                  <th scope='col'>{i18next.t('log:time')}</th>
                  <th scope='col'>{i18next.t('log:emitter')}</th>
                  <th scope='col'>{i18next.t('log:type')}</th>
                  <th scope='col'>{i18next.t('log:content')}</th>
                </tr>
              </thead>
              <tbody>{n}</tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
}
const mapStateToProps = state => {
  return {
    logs: state.logs
  }
}
const log = connect(
  mapStateToProps,
  null
)(LogCenter)
export default log
