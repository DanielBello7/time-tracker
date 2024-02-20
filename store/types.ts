interface DeepPartialArray<Thing> extends Array<DeepPartial<Thing>> { }

type DeepPartialObject<Thing> = {
  [Key in keyof Thing]?: DeepPartial<Thing[Key]>
}

export type DeepPartial<Thing> = Thing extends Function
  ? Thing
  : Thing extends Array<infer InferredArrayMember>
  ? DeepPartialArray<InferredArrayMember>
  : Thing extends object
  ? DeepPartialObject<Thing>
  : Thing | undefined


export type INTERFACE_APPLICATION = "SUPPORT" | "ADMIN" | "ORGANIZATION";

