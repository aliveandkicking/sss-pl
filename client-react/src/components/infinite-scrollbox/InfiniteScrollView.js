import React from 'react'
import { rootStyles as styles } from './InfiniteScrollStyle'

const offsetElemetsCount = 15000

export class InfiniteScrollView extends React.Component {
  state = {
    checkedWindowWidth: 0,
    visibleWidth: 0,
    firstItemIndex: 0,
    lastItemIndex: 0
  }

  dragging = false
  mouseDownXPos = 0
  contentWidth = 2 * offsetElemetsCount * this.props.itemWidth
  scrollPosition = -1

  getContentStyle() {
    const minWidth = `${this.contentWidth}px`
    return {
      ...styles.scrollableContent,
      minWidth,
      maxWidth: minWidth
    }
  }

  checkItems () {
    const firstItemIndex = Math.floor(this.scrollPosition / this.props.itemWidth)
    const lastItemIndex = Math.floor(
      Math.min(
        this.scrollPosition + this.state.visibleWidth,
        this.contentWidth - this.props.itemWidth
      ) / this.props.itemWidth)

    if ((firstItemIndex !== this.state.firstItemIndex) ||
        (lastItemIndex !== this.state.lastItemIndex)) {
      this.setState({
        firstItemIndex: firstItemIndex,
        lastItemIndex: lastItemIndex
      })
    }
  }

  onGetRootRef = (div) => {
    if (this.state.visibleWidth && div) {
      if (this.scrollPosition >= 0) {
        div.scrollLeft = this.scrollPosition
        this.checkItems()
      } else {
        div.scrollLeft = Math.floor(div.scrollWidth / 2 -
          (this.state.visibleWidth / 2 - this.props.itemWidth / 2))
      }
    }
  }

  getElement(index) {
    return (
      <div
        key={index}
        style={{
          ...styles.elementContainer,
          minWidth: this.props.itemWidth,
          maxWidth: this.props.itemWidth
        }}
      >
        {this.props.onGetItem(index)}
      </div>
      )
    }

    getElements() {
      const result = []
      if ((!this.state.firstItemIndex) && (this.state.firstItemIndex !== 0)) {
        return null
      }
      for (let i = this.state.firstItemIndex; i <= this.state.lastItemIndex; i++) {
        result.push(this.getElement(i - offsetElemetsCount))
      }
      return result
    }

  render () {
    if ((this.state.checkedWindowWidth !== this.props.windowWidth)) {
      return (
        <div
          style={styles.sizeInitnializer}
          ref={(div) => {
            if (div) {
              this.setState({
                visibleWidth: div.clientWidth,
                checkedWindowWidth: this.props.windowWidth
              })
            }
          }}
        />
      )
    }

    return (
      <div
        ref={this.onGetRootRef}
        style={styles.root}

        onScroll={(e) => {
          if (e.currentTarget) {
            this.scrollPosition = e.currentTarget.scrollLeft
            this.checkItems()
          }
        }}

        onWheel={(e) => {
          e.stopPropagation()
          e.preventDefault()
          if (e.currentTarget) {
            e.currentTarget.scrollBy({
              left: -this.props.itemWidth * e.deltaY / 100,
              behavior: 'smooth'
            })
          }
        }}

        onMouseLeave={(e) => {
          this.dragging = false
        }}

        onMouseDown={(e) => {
          this.dragging = true
          this.mouseDownXPos = e.pageX
        }}

        onMouseUp={(e) => {
          this.dragging = false
        }}

        onMouseMove={(e) => {
          if (this.dragging) {
            if (e.currentTarget) {
              e.currentTarget.scrollBy({left: this.mouseDownXPos - e.pageX, behavior: 'instant'})
              this.mouseDownXPos = e.pageX
            }
          }
        }}
      >

        <div style={this.getContentStyle()}>
          <div
            style={{
              ...styles.visibleContent,
              left: `${this.state.firstItemIndex * this.props.itemWidth}px`,
              width: `${(this.state.lastItemIndex - this.state.firstItemIndex) * this.props.itemWidth}px`
            }}
          >
            {this.getElements()}
          </div>
        </div>

      </div>
    )
  }
}
