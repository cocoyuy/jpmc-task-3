import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]):Row {
    const price_Abc = (ServerRespond[0].top_ask.price + ServerRespond[0].top_bid.price)/2;
    const price_Def = (ServerRespond[1].top_ask.price + ServerRespond[1].top_bid.price)/2;
    const ratio = price_Abc/price_Def;
    const upperBound = 1+0.05;
    const lowerBound = 1-0.05;
      return {
        price_abc: price_Abc,
        price_def: price_Def,
        ratio,
        timestamp: ServerRespond[0].timestamp > ServerRespond[1].timestamp ? ServerRespond[0].timestamp : ServerRespond[1].timestamp,
        upper_bound: upperBound,
        lower_bound: lowerBound
        trigger_alert:(ratio>upperBound || ratio<lowerBound)?ratio:undefined,
      };
  }; 
}
