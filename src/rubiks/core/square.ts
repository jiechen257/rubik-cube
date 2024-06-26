import { ColorRepresentation, DoubleSide, Mesh, MeshBasicMaterial, Shape, ShapeGeometry, Vector2, Vector3 } from 'three'
import { CubeElement } from './cubeData'

// 画一个小方块
export const createSquare = (color: ColorRepresentation, cubeElement: CubeElement) => {
  const scale = new Vector3(0.9, 0.9, 0.9)
  const squareShape = new Shape()
  const x = 0,
    y = 0
  // top
  squareShape.moveTo(x - 0.4, y + 0.5)
  squareShape.lineTo(x + 0.4, y + 0.5)
  // 为了使得方块边缘更平滑
  squareShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.5, y + 0.5, x + 0.5, y + 0.4)

  // right
  squareShape.lineTo(x + 0.5, y - 0.4)
  squareShape.bezierCurveTo(x + 0.5, y - 0.5, x + 0.5, y - 0.5, x + 0.4, y - 0.5)

  // bottom
  squareShape.lineTo(x - 0.4, y - 0.5)
  squareShape.bezierCurveTo(x - 0.5, y - 0.5, x - 0.5, y - 0.5, x - 0.5, y - 0.4)

  // left
  squareShape.lineTo(x - 0.5, y + 0.4)
  squareShape.bezierCurveTo(x - 0.5, y + 0.5, x - 0.5, y + 0.5, x - 0.4, y + 0.5)

  const geometry = new ShapeGeometry(squareShape)
  const material = new MeshBasicMaterial({ color: cubeElement.color })
  const mesh = new SquareMesh(geometry, material, cubeElement)
  // 添加黑色材质填补间隙
  const material2 = new MeshBasicMaterial({
    color: 'black',
    side: DoubleSide
  })

  const plane = new Mesh(geometry, material2)
  // 移动靠后一点，防止重叠
  plane.position.set(0, 0, -0.1) 
  // 盖住整个魔方
  plane.scale.copy(new Vector3(1.1, 1.1, 1.1)) 
  mesh.scale.copy(scale)
  mesh.add(plane)

  // 将方块移动到正确的位置
  mesh.position.copy(cubeElement.pos)
  mesh.lookAt(mesh.position.clone().add(cubeElement.normal))
  return mesh
}

export class SquareMesh extends Mesh<ShapeGeometry, MeshBasicMaterial> {
  public element: CubeElement
  public constructor(geometry: ShapeGeometry, material: MeshBasicMaterial, element: CubeElement) {
    super(geometry, material)
    this.element = element
  }

  public clone(recursive?: boolean) {
    const cloned = super.clone(recursive)
    cloned.material = this.material.clone()
    cloned.geometry = this.geometry.clone()
    return cloned
  }
}
