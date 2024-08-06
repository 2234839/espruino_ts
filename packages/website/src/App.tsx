import { createEffect, createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { effect, render } from "solid-js/web";
import { throttled } from "./util/hooks/solid";
const url = "http://192.168.2.167/angle";
const steering = async (angle: number) => {
  await fetch(url, { method: "POST", body: angle.toString() });
};

function App() {
  const [gamepads, setGamepads] = createStore<{ [key: number]: Gamepad }>({});
  /** axes[0] 对应左摇杆左右 1 对应左摇杆上下， 2 3 对应右摇杆左右 上下 */
  const [axes, setAxes] = createSignal<number[]>([]);
  /** 我的手柄只能读取到 value 的值 */
  const [buttons, setButtons] = createSignal<
    { value: number; pressed: boolean; touched: boolean }[]
  >([]);
  /** 映射手柄按钮 */
  const useGamepadButtonMap = () => {
    const useButtonMap = (index: number) =>
      createMemo((): number | undefined => {
        return buttons()[index]?.value;
      });
    const useAxesMap = (index: number) =>
      createMemo((): number | undefined => {
        return axes()[index];
      });
    return {
      /** 摇杆四个轴，取值范围是-1 到 1 */
      rocker_left_x: useAxesMap(0),
      rocker_left_y: useAxesMap(1),
      rocker_right_x: useAxesMap(2),
      rocker_right_y: useAxesMap(3),
      /** 右侧a b x y */
      btn_a: useButtonMap(0),
      btn_b: useButtonMap(1),
      btn_x: useButtonMap(2),
      btn_y: useButtonMap(3),
      /** 肩键 */
      shoulder_left: useButtonMap(4),
      shoulder_right: useButtonMap(5),
      /** 线性扳机 */
      trigger_left: useButtonMap(6),
      trigger_right: useButtonMap(7),
      /** 功能键 */
      btn_select: useButtonMap(8),
      btn_start: useButtonMap(9),
      /** 摇杆下按，两个快捷键也是这个 */
      btn_rocker_left: useButtonMap(10),
      btn_rocker_right: useButtonMap(11),
      /** 左侧上下左右 */
      btn_top: useButtonMap(12),
      btn_bottom: useButtonMap(13),
      btn_left: useButtonMap(14),
      btn_right: useButtonMap(15),
    };
  };
  const gameBtn = useGamepadButtonMap();

  onMount(() => {
    const id = setInterval(() => {
      const gamepad = Object.values(gamepads)[0];
      if (!gamepad) return;
      setAxes([...gamepad.axes]);
      setButtons([...gamepad.buttons]);
      if (gameBtn.shoulder_left() === 1) {
        setAngle((angle() - 10) % 180);
      }
      if (gameBtn.shoulder_right() === 1) {
        setAngle((angle() + 10) % 180);
      }
    }, 100);
    onCleanup(() => {
      clearInterval(id);
    });
  });
  // 管理手柄链接
  onMount(() => {
    const onGamepadConnected = (event: GamepadEvent) => {
      setGamepads(event.gamepad.index, event.gamepad);
    };
    const onGamepadDisconnected = (event: GamepadEvent) => {
      const newGamepads = { ...gamepads };
      delete newGamepads[event.gamepad.index];
      setGamepads(newGamepads);
    };
    const id = setInterval(() => {
      navigator.getGamepads().forEach((gamepad) => {
        if (!gamepad) return;
        setGamepads(gamepad.index, gamepad);
      });
    }, 1000);

    window.addEventListener("gamepadconnected", onGamepadConnected);
    window.addEventListener("gamepaddisconnected", onGamepadDisconnected);
    onCleanup(() => {
      clearInterval(id);
      window.removeEventListener("gamepadconnected", onGamepadConnected);
      window.removeEventListener("gamepaddisconnected", onGamepadDisconnected);
    });
  });
  const [angle, setAngle] = createSignal(0);
  const steeringThrottled = throttled(() => {
    const v = (gameBtn.trigger_left() ?? 0) * 180 || angle();
    console.log("[v]", v);
    steering(v);
  }, 100);

  effect(() => {
    gameBtn.trigger_left(), angle();
    steeringThrottled();
  });
  return (
    <>
      <input
        type="range"
        min="0"
        max="180"
        value={angle()}
        onInput={(e) => setAngle(Number(e.target.value))}
      />
      {Object.entries(gamepads).map(([key, gamepad]) => (
        <div>
          <div>index:{key}</div>
          <div>id:{gamepad.id}</div>
          {Object.entries(gameBtn).map(([key, value]) => (
            <div>
              {key}:{value()}
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

render(App, document.getElementById("root")!);
