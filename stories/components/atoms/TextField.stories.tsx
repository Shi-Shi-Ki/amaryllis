// import { BaseTextField } from "@/components/atoms/bk/BaseTextField"
import TextField from "@/components/atoms/TextField"
import * as GlobalType from "@/utils/CommonTypes"
import type { Meta, StoryObj } from "@storybook/react"

type Story = StoryObj<typeof TextField>
const meta: Meta<typeof TextField> = {
  title: "components/atoms/TextField",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {
    colorType: {
      control: "radio",
      options: [
        GlobalType.ColorType.PRIMARY,
        GlobalType.ColorType.SECONDARY,
        GlobalType.ColorType.ACCENT,
        GlobalType.ColorType.ERROR,
        GlobalType.ColorType.GHOST,
      ],
      description: "色のタイプ値",
    },
    widthSizeType: {
      description: "横幅",
      control: "radio",
      options: [
        GlobalType.SizeType.TINY,
        GlobalType.SizeType.SMALL,
        GlobalType.SizeType.MEDIUM,
        GlobalType.SizeType.LARGE,
      ],
    },
    componentSizeType: {
      description: "フォームの大きさ",
      control: "radio",
      options: [
        GlobalType.SizeType.TINY,
        GlobalType.SizeType.SMALL,
        GlobalType.SizeType.MEDIUM,
        GlobalType.SizeType.LARGE,
      ],
    },
    register: {
      description: "バリデーション設定",
    },
    textType: {
      control: "radio",
      options: [GlobalType.TextType.TEXT, GlobalType.TextType.EMAIL, GlobalType.TextType.PASSWORD],
      description: "フォームタイプ",
    },
    placeholder: {
      description: "フォーム内のプレスホルダー値",
    },
    hintText: {
      description: "フォーム上部に表示するメッセージ",
    },
    // validationType: {
    //   control: "radio",
    //   options: [
    //     GlobalType.ColorType.NONE,
    //     GlobalType.ColorType.SUCCESS,
    //     GlobalType.ColorType.WARNING,
    //     GlobalType.ColorType.ERROR,
    //   ],
    //   description: "バリデーションメッセージのアイコン",
    // },
    // fieldError: {
    //   description: "エラーメッセージ",
    // },
    disabled: {
      control: "boolean",
      description: "非活性の設定",
    },
  },
  args: {
    widthSizeType: GlobalType.SizeType.MEDIUM,
    componentSizeType: GlobalType.SizeType.MEDIUM,
    colorType: GlobalType.ColorType.PRIMARY,
    textType: GlobalType.TextType.TEXT,
    placeholder: "入力フォーム",
    hintText: "入力フォームです",
    // validationType: GlobalType.ColorType.ERROR,
    // fieldError: {
    //   message: "バリデーション用メッセージです",
    // } as FieldError,
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        component: "入力フィールド<br/>任意のバリデーションやメッセージも設定可能",
      },
    },
  },
}

export const Primary: Story = {
  args: {
    colorType: GlobalType.ColorType.PRIMARY,
  },
}

export const Secondary: Story = {
  args: {
    colorType: GlobalType.ColorType.SECONDARY,
  },
}

export const Accent: Story = {
  args: {
    colorType: GlobalType.ColorType.ACCENT,
  },
}

export const Ghost: Story = {
  args: {
    colorType: GlobalType.ColorType.GHOST,
  },
}

// export const Success: Story = {
//   args: {
//     colorType: GlobalType.ColorType.PRIMARY,
//     validationType: GlobalType.ColorType.SUCCESS,
//     fieldError: {
//       message: "成功メッセージです",
//     } as FieldError,
//   },
// }

// export const Warning: Story = {
//   args: {
//     colorType: GlobalType.ColorType.PRIMARY,
//     validationType: GlobalType.ColorType.WARNING,
//     fieldError: {
//       message: "警告メッセージです",
//     } as FieldError,
//   },
// }

// export const Error: Story = {
//   args: {
//     colorType: GlobalType.ColorType.PRIMARY,
//     validationType: GlobalType.ColorType.ERROR,
//     fieldError: {
//       message: "エラーメッセージです",
//     } as FieldError,
//   },
// }

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

// https://storybook.eds.equinor.com/?path=/docs/inputs-textfield--docs#validation
// https://zenn.dev/snaka/scraps/88dc593267779a
// https://storybook.js.org/docs/writing-stories#working-with-react-hooks
// const RequireInputValidationHook = () => {
//   const {
//     register,
//     formState: { errors, isSubmitSuccessful },
//     handleSubmit,
//     control,
//   } = useForm<{
//     name_field: string
//   }>()
//   console.log(`isSubmitSuccessful: ${isSubmitSuccessful}`)
//   return (
//     <form onSubmit={handleSubmit((name_field) => console.log(name_field))}>
//       <Controller
//         name="name_field"
//         control={control}
//         rules={{
//           required: "必須入力の項目です",
//           minLength: {
//             value: 10,
//             message: "最低10文字以上入力してください",
//           },
//         }}
//         render={({ field: { ref, ...props }, fieldState: { error } }) => (
//           <BaseTextField
//             register={register("name_field")}
//             fieldError={errors.name_field}
//             validationType={GlobalType.ColorType.ERROR}
//             colorType={GlobalType.ColorType.PRIMARY}
//             placeholder="名前"
//             hintText="名前を入力してください"
//           />
//         )}
//       />
//       <div>
//         <button className="btn btn-primary" type="submit">
//           submit
//         </button>
//       </div>
//     </form>
//   )
// }
// export const RequireInputValidation: Story = {
//   render: () => {
//     return <RequireInputValidationHook />
//   },
// }

export default meta
