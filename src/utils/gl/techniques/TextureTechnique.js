import Technique from '../common/Technique'
import Shader from '../common/Shader'
import Program from '../common/Program'
import vs_code from '@/assets/shaders/texture_vertex_shader.glsl'
import ps_code from '@/assets/shaders/texture_fragment_shader.glsl'

export default class extends Technique {
  onCreate() {
    this.vertexShader = new Shader(this.gl, this.gl.VERTEX_SHADER).compile(vs_code)
    this.fragmentShader = new Shader(this.gl, this.gl.FRAGMENT_SHADER).compile(ps_code)
    this.program = new Program(this.gl)
    this.program.addShader(this.vertexShader).addShader(this.fragmentShader).link()
  }

  getPositionAttribute() { return this.getAttributeLocation('position') }
  getProjectionMatrixUniform() { return this.getUniformLocation('projectionMatrix') }
  getViewMatrixUniform() { return this.getUniformLocation('viewMatrix') }
  getModelMatrixUniform() { return this.getUniformLocation('modelMatrix') }
  getTextureCoordAttribute() { return this.getAttributeLocation('textureCoord') }
  getSamplerUniform() { return this.getUniformLocation('pictures') }
  getDiffuseColorUniform() { return this.getUniformLocation('diffuseColor') }
  getDiffuseMapEnabledUniform() { return this.getUniformLocation('diffuseMapEnabled') }

  getThingRequirement() {
    return {
      needColor: false,
      needNormal: false,
      needTexture: true
    }
  }
}
