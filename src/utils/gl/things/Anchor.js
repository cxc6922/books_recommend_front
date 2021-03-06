import Thing from '../common/Thing.js'
import Buffer from '../common/Buffer'
import VertexArrayObject from '../common/VertexArrayObject'

export default class extends Thing {
  onCreateVbo() {
    this.vboPositions = new Buffer(this.gl, this.gl.ARRAY_BUFFER, this.gl.STATIC_DRAW)
    this.vboColors = new Buffer(this.gl, this.gl.ARRAY_BUFFER, this.gl.STATIC_DRAW)

    var vertices = new Float32Array([
      0.0, 0.0, 0.0,
      1, 0.0, 0.0,
      0.0, 0.0, 0.0,
      0.0, 1, 0.0,
      0.0, 0.0, 0.0,
      0.0, 0.0, 1
    ])

    var colors = new Float32Array([
      1, 0.0, 0.0,
      1.0, 0.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 1.0, 0.0,
      0.0, 0.0, 1.0,
      0.0, 0.0, 1.0
    ])

    this.vboPositions.bind()
    this.vboPositions.setData(vertices)
    this.vboColors.bind()
    this.vboColors.setData(colors)
  }

  onCreateVao(technique, requirement) {
    this.vao = new VertexArrayObject(this.gl)
    this.vao.bind()
    var positionAttributeId = technique.getPositionAttribute()
    this.vboPositions.bind()
    this.gl.enableVertexAttribArray(positionAttributeId)
    this.gl.vertexAttribPointer(positionAttributeId, 3, this.gl.FLOAT, this.gl.FALSE, 0, this.gl.NULL)

    var colorAttributeId = technique.getColorAttribute()
    this.vboColors.bind()
    this.gl.enableVertexAttribArray(colorAttributeId)
    this.gl.vertexAttribPointer(colorAttributeId, 3, this.gl.FLOAT, this.gl.FALSE, 0, this.gl.NULL)
  }

  onDraw() {
    this.vao.bind()
    this.gl.drawArrays(this.gl.LINES, 0, 6)
  }
}
