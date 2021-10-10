import Component from '../react/Component'

const ReactDOM = {
  // 多次地调用render函数时,不会清除原来的内容 先清除一下挂载目标DOM的内容
  render:(vnode,container)=>{
      container.innerHTML = '';
      return render(vnode,container);
  }
}

function render (vnode, container){
    return container.appendChild(_render(vnode));
}

function createComponent(comp,props){
    let inst;
    // 如果是类定义的组件 则创建实例
    if(comp.prototype && comp.prototype.render){
        inst = new comp(props)
    } else {
        // 函数组件，将函数组件构造成类组件方便统一管理
        inst = new Component(props)
        inst.constructor = comp;
        inst.render = function(){
            return this.constructor(props)
        }
    }
    return inst
}

function setComponentProps(comp,props){
    // 设置属性
    comp.props = props;
    // 渲染组件
    renderComponent(comp);
}

function renderComponent(comp) {
    const renderer =  comp.render()
    comp.base = _render(renderer)
}

function _render(vnode) {
    // 如果vnode为定义,则什么都不做
    if (vnode === undefined || vnode === null || typeof vnode === 'boolean') return '';
    // 如果vnode是字符串是,渲染结果是一段文本
    if (typeof vnode === 'string') {
        return document.createTextNode(vnode);
    }

    // 如果tag是一个函数
    if( typeof vnode.tag === 'function'){
        // 创建组件
        const comp = createComponent(vnode.tag,vnode.attrs)
        // 设置组件的属性
        setComponentProps(comp,vnode.attrs)
        // 组件喧嚷的节点对象返回
        return comp.base
    }


    // 否则是一个虚拟DOM对象
    const {
        tag
    } = vnode;
    // 创建节点对象
    const dom = document.createElement(tag);

    if (vnode.attrs) {
        // 有属性
        Object.keys(vnode.attrs).forEach(key => {
            // 取值
            const val = vnode.attrs[key];
            // 为上面的节点对象设置属性
            setAttribute(dom, key, val);
        })
    }
    // 递归渲染子节点
    vnode.childrens.forEach(child => render(child, dom));
    // 将渲染结果挂载到真正的DOM上
    return dom;
}

function setAttribute(dom, key, value) {
  // 如果属性名是className,则改为class
  if (key === 'className') {
      key = 'class';
      // return key
  }

  // 如果属性名是onClick onBlur onChange.... 则是事件监听的方法
  if (/on\w+/.test(key)) {
      // 转小写
      key = key.toLowerCase();
      dom[key] = value || '';

  } else if (key === 'style') { //如果属性名是style,则更新style对象
      if (!value || typeof value === 'string') {
          dom.style.cssText = value || '';
      } else if (value && typeof value === 'object') {
          // 更新style对象
          for (let k in value) {
              // 可以通过style={width:20}这种形式来设置样式,可以省略掉单位px
              if (typeof value[k] === 'number') {
                  dom.style[k] = value[k] + 'px';
              } else {
                  dom.style[k] = value[k]
              }
              //  dom.style[ k ] = typeof value[ k ] === 'number' ? value[ k ] + 'px' : value[ k ];
          }
      }
  } else { //普通属性则直接更新属性
      if (key in dom) {
          dom[key] = value || '';
      }
      if (value) { //有值则更新值
          dom.setAttribute(key, value);
      } else { //没有值 移除此属性
          dom.removeAttribute(key);
      }
  }
}


export default ReactDOM;

