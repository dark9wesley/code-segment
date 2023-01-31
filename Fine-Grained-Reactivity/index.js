// 保存effect调用栈
const effectStack = []

function subscribe(effect, subs) {
  // 订阅关系确认
  subs.add(effect)

  // 依赖关系确认
  effect.deps.add(subs)
}

function cleanup(effect) {
  // 依赖关系取消
  for (const subs of effect.deps) {
    subs.delete(effect)
  }

  // 将该effect依赖的所有state对应的subs移除
  effect.deps.clear()
}

function useState(value) {
  // 保存订阅该state的effect
  const subs = new Set()

  const getter = () => {
    const effect = effectStack[effectStack.length - 1]
    if (effect) {
      // 建立订阅发布关系
      subscribe(effect, subs)
    }
    return value
  }

  const setter = (nextValue) => {
    value = nextValue

    // 通知所有打岡該state変化的effect抗行
    for (const effect of [...subs]) {
      effect.execute()
    }
  }

  return [getter, setter]
}

function useEffect(callback) {
  const execute = () => {
    // 重置依赖
    cleanup(effect)

    // 将当前effect推入栈顶
    effectStack.push(effect)

    try {
      // 执行回调
      callback()
    } finally {
      // effect出栈
      effectStack.pop()
    }
  }

  const effect = {
    execute,
    deps: new Set(),
  }

  execute()
}
