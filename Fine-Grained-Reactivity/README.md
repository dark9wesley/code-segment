# 细粒度更新

“能自动追踪依赖的技术” 被称为“细粒度更新”(Fine Grained Reactivity)，它是许多前端框架建立“自变量变化到 UI 变化” 的底层原理。

KnockoutJs 曾经在 2010 年初采用这种技术实现“响应式更新”。 这里将使用 70 行代码实现一个“细粒度更新” 的简单示例。

这里使用 React API 的名称来为实现命名。