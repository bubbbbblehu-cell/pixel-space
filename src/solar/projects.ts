import { language } from '../i18n';
import type { PortfolioCase, PortfolioPlanet } from '../game/planets';
import { SOLAR_BODIES } from './orbits';

type Localized = readonly [zh: string, en: string];
type DemoCase = {
  id: string;
  title: Localized;
  description: Localized;
  approach: Localized;
};

const casesByWorld: DemoCase[][] = [
  [
    {
      id: 'orbit-coffee',
      title: ['轨道咖啡 · 品牌视觉', 'Orbit Coffee · Brand Identity'],
      description: ['为一家虚构的夜间咖啡店设计品牌视觉，让路过的人在夜里也能认出店铺。', 'An identity for a fictional late-night café designed to be recognizable from the street after dark.'],
      approach: ['用环形标记呼应咖啡杯沿与行星轨道，以暖橙和深蓝区分门头、杯套和菜单上的信息。', 'A ring echoes both a cup rim and a planetary orbit. Amber and navy organize information across signage, sleeves and menus.'],
    },
    {
      id: 'moon-post',
      title: ['月球邮局 · 视觉规范', 'Moon Post · Visual Guidelines'],
      description: ['为虚构的太空邮局建立一套可用于邮票和信封的标识规范。', 'A visual system for stamps and envelopes from a fictional space post office.'],
      approach: ['以月牙和网格构建图标，按目的地改变色彩，让整套标识在小尺寸下仍然清晰。', 'A crescent and grid form the icons. Destination colors keep small-format labels easy to read.'],
    },
  ],
  [
    {
      id: 'signal-festival',
      title: ['星讯节 · 主视觉', 'Signal Festival · Key Visual'],
      description: ['为一场虚构的电子音乐节设计海报与舞台屏幕。', 'Poster and stage-screen directions for a fictional electronic music festival.'],
      approach: ['将信号脉冲做成放射排布，预留固定的演出信息区，便于适配横竖画幅。', 'Radial pulses carry the concept, with a dedicated area for the lineup across portrait and landscape formats.'],
    },
  ],
  [
    {
      id: 'frost-station',
      title: ['霜原观测站 · 美术概设', 'Frost Station · Art Direction'],
      description: ['为一座虚构的极地观测站定义环境色彩、灯光和镜头重点。', 'Environment colors, lighting and framing for a fictional polar observatory.'],
      approach: ['以低饱和冰蓝建立空间层次，用暖色信标引导视线看向建筑入口。', 'Muted ice blues establish depth while a warm beacon draws the eye to the entrance.'],
    },
  ],
  [
    {
      id: 'comet-log',
      title: ['彗星采集 · 互动页面', 'Comet Log · Interactive Web'],
      description: ['设计一个虚构的手机端探索流程，访客可以选择路线并收集彗星样本。', 'A fictional mobile exploration flow for choosing a route and collecting comet samples.'],
      approach: ['把路线、收集和结果拆成三个界面，用进度提示让访客始终知道当前步骤。', 'Route selection, collection and results occupy separate screens with persistent progress cues.'],
    },
  ],
  [
    {
      id: 'tide-atlas',
      title: ['潮汐图鉴 · 平面设计', 'Tidal Atlas · Graphic Design'],
      description: ['为一套虚构的海洋观察图鉴设计封面和内页版式。', 'Cover and interior layouts for a fictional ocean field guide.'],
      approach: ['用等高线组织版面，让潮汐时间、观察点位和图例在同一视觉系统下清晰可读。', 'Contour lines organize the layout so tides, observation points and legends are easy to scan.'],
    },
  ],
  [
    {
      id: 'star-sprint',
      title: ['星际接力 · 赛事实验', 'Star Sprint · Event Design'],
      description: ['为虚构的社区接力赛制作赛程牌和选手号码牌。', 'Schedule panels and bibs for a fictional community relay.'],
      approach: ['用清晰的数字层级和接力路线图案连接物料，使它们在不同尺寸下仍然容易辨认。', 'Bold numbers and a relay motif connect the materials and keep them recognizable at different sizes.'],
    },
  ],
];

function localize(value: Localized): string {
  return value[language === 'en' ? 1 : 0];
}

export const SOLAR_PROJECTS: PortfolioPlanet[] = SOLAR_BODIES.map((body, index) => {
  const entries = casesByWorld[index].map((demo): PortfolioCase => {
    const art = `${import.meta.env.BASE_URL}assets/demo/${demo.id}`;
    const title = localize(demo.title);
    return {
      id: demo.id,
      title,
      subtitle: body.category,
      description: localize(demo.description),
      tags: [body.category],
      sections: [{
        title: localize(['设计思路', 'Design approach']),
        body: localize(demo.approach),
      }],
      image: `${art}-concept.webp`,
      imageSize: { width: 1200, height: 675 },
      gallery: [{
        src: `${art}-application.webp`,
        alt: `${title} · ${localize(['应用示意', 'Application mockup'])}`,
        width: 1200,
        height: 675,
      }],
    };
  });
  return {
    ...entries[0],
    id: body.id,
    cases: entries,
    category: body.category,
    x: 0,
    y: 0,
    visualRadius: body.size,
    triggerPadding: 1,
    spriteKey: body.id,
  };
});
