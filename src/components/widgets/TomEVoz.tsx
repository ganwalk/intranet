import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Volume2, MessageCircle,
  CheckCircle, XCircle, ArrowRight, Lightbulb, BookOpen,
  AlertTriangle, GraduationCap, Layers, Award,
  Library, FileText, SlidersHorizontal, Mic, Handshake, Anchor, Sparkles } from
"lucide-react";
import { areaIcons } from "@/data/areasEmpresa";
import * as Data from "./tom-e-voz/TomEVozData";
import { TomEVozAIFoodInline } from "./tom-e-voz/TomEVozAIFoodInline";
import { TeamPhoto } from "@/components/TeamPhoto";

/* ------------------------------------------------------------------ */
/*  Helpers de renderização                                            */
/* ------------------------------------------------------------------ */

function SectionTitle({ icon: Icon, children }: {icon: React.ElementType;children: React.ReactNode;}) {
  return (
    <div className="flex items-center gap-3 mb-6 border-b pb-4">
      <Icon className="h-6 w-6 text-accent shrink-0" />
      <h2 className="font-bold font-anek text-2xl md:text-3xl leading-tight text-foreground">{children}</h2>
    </div>);

}

function SubTitle({ children }: {children: React.ReactNode;}) {
  return <h3 className="font-bold font-anek mb-4 text-xl text-foreground">{children}</h3>;
}

function P({ children }: {children: React.ReactNode;}) {
  return <p className="text-sm text-foreground/80 font-roboto leading-relaxed whitespace-pre-wrap mb-4 last:mb-0">{children}</p>;
}

function CardBox({ accent, children }: {accent?: boolean;children: React.ReactNode;}) {
  return (
    <div className={`rounded-2xl p-6 md:p-8 ${accent ? "glass-panel !bg-primary/10 !border-primary/20" : "glass-panel"}`}>
      {children}
    </div>);

}

function BulletList({ items, icon }: {items: string[];icon?: "check" | "x" | "arrow";}) {
  const IconEl = icon === "x" ? XCircle : icon === "arrow" ? ArrowRight : CheckCircle;
  const color = icon === "x" ? "text-destructive/60" : "text-accent";
  return (
    <ul className="space-y-2">
      {items.map((item, i) =>
      <li key={i} className="flex gap-2 text-sm font-roboto text-foreground/80">
          <IconEl className={`h-4 w-4 mt-0.5 shrink-0 ${color}`} />
          <span>{item}</span>
        </li>
      )}
    </ul>);

}

function ProibidoCard({ proibido, motivo }: {proibido: string;motivo: string;}) {
  return (
    <div className="rounded-xl border p-4 bg-card flex flex-col sm:flex-row gap-3">
      <div className="flex items-start gap-2 sm:w-1/2">
        <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-destructive" />
        <span className="text-sm font-roboto font-semibold text-foreground/80">{proibido}</span>
      </div>
      <div className="flex items-start gap-2 sm:w-1/2">
        <ArrowRight className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
        <span className="text-sm font-roboto text-foreground/80">{motivo}</span>
      </div>
    </div>);

}

function DataTable({ headers, rows }: {headers: string[];rows: string[][];}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            {headers.map((h, i) =>
            <th key={i} className="text-left py-2 pr-4 font-bold font-anek text-foreground/60 uppercase tracking-wider text-xs">{h}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) =>
          <tr key={i} className="border-b last:border-0">
              {row.map((cell, j) =>
            <td key={j} className="py-3 pr-4 font-roboto text-foreground/80">{cell}</td>
            )}
            </tr>
          )}
        </tbody>
      </table>
    </div>);

}

/* ------------------------------------------------------------------ */
/*  COMPONENTE PRINCIPAL                                               */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  COMPONENTE PRINCIPAL                                               */
/* ------------------------------------------------------------------ */

export function TomEVoz() {

  return (
    <div className="space-y-0">

      {/* ============================================================= */}
      {/*  FUNDAMENTOS                                                   */}
      {/* ============================================================= */}
      <section id="fundamentos" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={BookOpen}>Fundamentos</SectionTitle>

        {/* Dicionário */}
        <CardBox>
          <SectionTitle icon={Library}>Dicionário do Manual</SectionTitle>
          <P>Se a ideia não é clara, ela é inútil. O que parece familiar para você pode ser novidade para outra pessoa do time, e ruído na comunicação é o primeiro passo para o fracasso. Por isso, antes de avançarmos, verifique o dicionário com palavras que vão surgir ao longo do manual.</P>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
            {Data.dicionario.map((d) =>
            <div key={d.termo} className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">{d.termo}</p>
                <p className="text-xs font-roboto text-foreground/70">{d.definicao}</p>
              </div>
            )}
          </div>
        </CardBox>

        {/* Introdução */}
        <CardBox>
          <SectionTitle icon={FileText}>{Data.introducaoManual.titulo}</SectionTitle>
          {Data.introducaoManual.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
        </CardBox>

        {/* Tom e Voz — O que é isso? */}
        <CardBox>
          <SectionTitle icon={MessageCircle}>{Data.tomEVozIntro.titulo}</SectionTitle>
          {Data.tomEVozIntro.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
        </CardBox>

        {/* Voz */}
        <CardBox accent>
          <SectionTitle icon={Volume2}>{Data.vozDefinicao.titulo}</SectionTitle>
          {Data.vozDefinicao.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
        </CardBox>

        {/* Tom */}
        <CardBox>
          <SectionTitle icon={SlidersHorizontal}>{Data.tomDefinicao.titulo}</SectionTitle>
          {Data.tomDefinicao.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-4">
            {Data.tomDefinicao.regras.map((r) =>
            <div key={r.contexto} className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs font-bold text-foreground/60 uppercase tracking-wider mb-1">{r.contexto}</p>
                <p className="text-sm font-roboto text-foreground/80">{r.descricao}</p>
              </div>
            )}
          </div>
          <P>{Data.tomDefinicao.conclusao}</P>
        </CardBox>



      </section>

      {/* ============================================================= */}
      {/*  VOZ DA LIDERANÇA                                              */}
      {/* ============================================================= */}
      <section id="fundador" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={Lightbulb}>Voz da Liderança</SectionTitle>

        <CardBox>
          <SectionTitle icon={Mic}>{Data.vozFundador.titulo}</SectionTitle>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* Mesma foto (e mesmo enquadramento) usada no resto da
                Central — inclusive na versão do Modo Megabrain. */}
            <TeamPhoto
              id="colaborador-01"
              alt="Colaborador 1 — fundador(a) da empresa"
              className="w-full md:w-48 lg:w-56 rounded-xl aspect-[1/1] shrink-0" />

            <div className="flex-1">
              {Data.vozFundador.paragrafos.slice(0, 2).map((p, i) => <P key={i}>{p}</P>)}
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {Data.vozFundador.paragrafos.slice(2).map((p, i) => <P key={`rest-${i}`}>{p}</P>)}
          </div>
        </CardBox>

        <CardBox>
          <SectionTitle icon={XCircle}>{Data.vozFundador.comoNaoComunicar.titulo}</SectionTitle>
          <P>{Data.vozFundador.comoNaoComunicar.intro}</P>
          <BulletList items={Data.vozFundador.comoNaoComunicar.itens} icon="x" />
        </CardBox>

        <CardBox>
          <SectionTitle icon={AlertTriangle}>Exemplos de erros e correções</SectionTitle>
          <div className="space-y-4">
            {Data.vozFundador.exemplosErros.map((e, i) =>
            <div key={i} className="rounded-xl border overflow-hidden">
                <div className="bg-destructive/10 p-4 border-b border-destructive/20">
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 mt-0.5 shrink-0 text-destructive" />
                    <div>
                      <p className="text-xs font-bold text-destructive uppercase tracking-wider mb-1">❌ Erro</p>
                      <p className="text-sm font-roboto text-foreground/80">{e.erro}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/5 p-4 border-b">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 mt-0.5 shrink-0 text-accent" />
                    <div>
                      <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">✅ Correção</p>
                      <p className="text-sm font-roboto text-foreground/80">{e.correcao}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-card">
                  <p className="text-xs font-bold text-foreground/60 uppercase tracking-wider mb-1">Porquê</p>
                  <p className="text-sm font-roboto text-foreground/70">{e.porque}</p>
                </div>
              </div>
            )}
          </div>
        </CardBox>
        <TomEVozAIFoodInline type="area" id="fundador" label="Voz da Liderança" />
      </section>

      {/* ============================================================= */}
      {/*  ÁREAS DA EMPRESA                                              */}
      {/* ============================================================= */}

      <div className="pt-[30px] pb-[45px] border-t border-border mt-[15px]">
        <h2 className="text-2xl md:text-4xl font-bold font-anek tracking-tight text-foreground mb-6">Áreas da Empresa</h2>
        <SubTitle>A voz que unifica diferentes áreas e os tons que as diferenciam</SubTitle>
        <P>Vale ressaltar que a voz é a identidade da empresa, portanto, é única e imutável. Por esse motivo, trouxemos a forma de diferentes áreas se comunicarem, mudando o tom, mas mantendo a identidade da marca de ponta a ponta.</P>
      </div>

      <section id="marketing" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={areaIcons.Marketing}>Marketing</SectionTitle>

        <CardBox>
          <SectionTitle icon={areaIcons.Marketing}>{Data.marketing.personalidade.titulo}</SectionTitle>
          {Data.marketing.personalidade.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
        </CardBox>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardBox>
            <SubTitle>{Data.marketing.guerrilha.titulo}</SubTitle>
            <P>{Data.marketing.guerrilha.paragrafo}</P>
          </CardBox>

          <CardBox>
            <SubTitle>{Data.marketing.liberdadeMedo.titulo}</SubTitle>
            <P>{Data.marketing.liberdadeMedo.paragrafo}</P>
          </CardBox>

          <CardBox>
            <SubTitle>{Data.marketing.luxo.titulo}</SubTitle>
            <P>{Data.marketing.luxo.paragrafo}</P>
          </CardBox>
        </div>

        {/* Canais */}
        <CardBox>
          <SectionTitle icon={areaIcons.Marketing}>Gestão de canais</SectionTitle>
          <P>{Data.canaisData.intro}</P>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {Data.canaisData.canais.map((c) =>
            <div key={c.nome} className="rounded-xl border p-5 bg-muted/30 hover:border-accent/30 transition-colors">
                <h4 className="font-bold font-anek mb-2">{c.nome}</h4>
                <p className="text-sm text-foreground/80 font-roboto leading-relaxed">{c.descricao}</p>
              </div>
            )}
          </div>
        </CardBox>

        {/* Dont's do Marketing */}
        <div className="rounded-xl border border-destructive/20 p-6 md:p-8 bg-destructive/5">
          <SectionTitle icon={XCircle}>{Data.marketing.donts.titulo}</SectionTitle>
          <P>{Data.marketing.donts.intro}</P>
          <DataTable
            headers={["Dont's", "Por quê?"]}
            rows={Data.marketing.donts.itens.map((d) => [d.proibido, d.motivo])} />
          
        </div>

        {/* Funil de vendas — movido para Marketing conforme PDF */}
        <CardBox>
          <SectionTitle icon={ArrowRight}>Etapas do funil de vendas</SectionTitle>
          <DataTable
            headers={["Etapa do Funil", "Tom de Voz", "Gatilho Principal"]}
            rows={Data.funilVendas.map((f) => [f.etapa, f.tom, f.gatilho])} />
          
        </CardBox>
        <TomEVozAIFoodInline type="area" id="marketing" label="Marketing" />
      </section>

      {/* ============================================================= */}
      {/*  COMERCIAL                                                     */}
      {/* ============================================================= */}
      <section id="comercial" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={areaIcons.Comercial}>Comercial</SectionTitle>

        <CardBox>
          <SectionTitle icon={Handshake}>{Data.comercial.titulo}</SectionTitle>
          <P>{Data.comercial.intro}</P>
        </CardBox>

        <CardBox accent>
          <SubTitle>{Data.comercial.pilares.intro}</SubTitle>
          <div className="space-y-4">
            {Data.comercial.pilares.itens.map((p) =>
            <div key={p.nome} className="rounded-lg bg-background/60 p-4">
                <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">{p.nome}</p>
                <p className="text-sm font-roboto text-foreground/80">{p.descricao}</p>
              </div>
            )}
          </div>
        </CardBox>

        <CardBox>
          <SubTitle>{Data.comercial.audio.titulo}</SubTitle>
          <BulletList items={Data.comercial.audio.itens} icon="arrow" />
        </CardBox>

        <P>{Data.comercial.passoPasso}</P>

        <CardBox>
          <SubTitle>{Data.comercial.dicas.titulo}</SubTitle>
          <BulletList items={Data.comercial.dicas.itens} icon="check" />
        </CardBox>

        <CardBox>
          <SectionTitle icon={AlertTriangle}>Exemplos: Como NÃO vs Como comunicamos</SectionTitle>
          <div className="space-y-3">
            {Data.comercial.exemplos.map((e, i) =>
            <ProibidoCard key={i} proibido={e.erro} motivo={e.correcao} />
            )}
          </div>
        </CardBox>

        <CardBox>
          <SubTitle>{Data.comercial.fluxo.titulo}</SubTitle>
          <BulletList items={Data.comercial.fluxo.itens} icon="arrow" />
        </CardBox>
        <TomEVozAIFoodInline type="area" id="comercial" label="Comercial" />
      </section>

      {/* ============================================================= */}
      {/*  ATENDIMENTO                                                   */}
      {/* ============================================================= */}
      <section id="atendimento" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={areaIcons.Atendimento}>Atendimento</SectionTitle>

        <CardBox>
          <SectionTitle icon={areaIcons.Atendimento}>{Data.atendimento.titulo}</SectionTitle>
          {Data.atendimento.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
        </CardBox>

        <CardBox>
          <SubTitle>{Data.atendimento.personalizacao.titulo}</SubTitle>
          <P>{Data.atendimento.personalizacao.paragrafo}</P>
        </CardBox>

        <CardBox>
          <SubTitle>{Data.atendimento.cuidados.titulo}</SubTitle>
          {Data.atendimento.cuidados.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
        </CardBox>

        <CardBox>
          <SubTitle>{Data.atendimento.erros.titulo}</SubTitle>
          <P>{Data.atendimento.erros.intro}</P>
          {Data.atendimento.erros.itens.map((e) =>
          <div key={e.tipo} className="rounded-lg bg-muted/50 p-3 mb-2">
              <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">{e.tipo}</p>
              <p className="text-sm font-roboto text-foreground/80">{e.descricao}</p>
            </div>
          )}
        </CardBox>

        <div className="rounded-xl border border-destructive/20 p-6 md:p-8 bg-destructive/5">
          <SubTitle>{Data.atendimento.diretrizesLinguisticas.titulo}</SubTitle>
          <P>{Data.atendimento.diretrizesLinguisticas.intro}</P>
          <DataTable
            headers={["❌ Terminantemente proibido", "✅ Use em vez disso"]}
            rows={Data.atendimento.diretrizesLinguisticas.tabela.map((t) => [t.proibido, t.use])} />
          
        </div>

        <CardBox>
          <SubTitle>{Data.atendimento.audioTexto.titulo}</SubTitle>
          {Data.atendimento.audioTexto.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
        </CardBox>

        <CardBox>
          <SubTitle>{Data.atendimento.boasPraticas.titulo}</SubTitle>
          <BulletList items={Data.atendimento.boasPraticas.itens} icon="check" />
        </CardBox>

        <CardBox accent>
          <SubTitle>{Data.atendimento.seguranca.titulo}</SubTitle>
          <P>{Data.atendimento.seguranca.paragrafo}</P>
        </CardBox>
        <TomEVozAIFoodInline type="area" id="atendimento" label="Atendimento" />
      </section>

      {/* ============================================================= */}
      {/*  CONSULTORIA                                                   */}
      {/* ============================================================= */}
      <section id="consultoria" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={areaIcons.Consultoria}>Consultoria</SectionTitle>

        <CardBox>
          <SectionTitle icon={areaIcons.Consultoria}>{Data.consultoria.titulo}</SectionTitle>
          <P>{Data.consultoria.intro}</P>
        </CardBox>

        <CardBox accent>
          <SubTitle>{Data.consultoria.pilares.titulo}</SubTitle>
          <div className="space-y-4">
            {Data.consultoria.pilares.itens.map((p) =>
            <div key={p.nome} className="rounded-lg bg-background/60 p-4">
                <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">{p.nome}</p>
                <p className="text-sm font-roboto text-foreground/80">{p.descricao}</p>
              </div>
            )}
          </div>
        </CardBox>

        <CardBox>
          <SubTitle>{Data.consultoria.boasPraticas.titulo}</SubTitle>
          <BulletList items={Data.consultoria.boasPraticas.itens} icon="check" />
        </CardBox>

        <CardBox>
          <SubTitle>{Data.consultoria.gestaoCrises.titulo}</SubTitle>
          <P>{Data.consultoria.gestaoCrises.paragrafo}</P>
        </CardBox>

        <div className="rounded-xl border border-destructive/20 p-6 md:p-8 bg-destructive/5">
          <SectionTitle icon={XCircle}>{Data.consultoria.comoNaoComunicar.titulo}</SectionTitle>
          <P>{Data.consultoria.comoNaoComunicar.intro}</P>
          <div className="space-y-3">
            {Data.consultoria.comoNaoComunicar.itens.map((item, i) =>
            <ProibidoCard key={i} proibido={item.proibido} motivo={item.motivo} />
            )}
          </div>
        </div>

        <CardBox>
          <SubTitle>{Data.consultoria.fluxo.titulo}</SubTitle>
          <div className="space-y-3">
            {Data.consultoria.fluxo.itens.map((f) =>
            <div key={f.etapa} className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs font-bold text-accent uppercase tracking-wider mb-1">{f.etapa}</p>
                <p className="text-sm font-roboto text-foreground/80">{f.descricao}</p>
              </div>
            )}
          </div>
        </CardBox>
        <TomEVozAIFoodInline type="area" id="consultoria" label="Consultoria" />
      </section>


      {/* ============================================================= */}
      {/*  CAPITAL HUMANO — antes de Produtos conforme PDF               */}
      {/* ============================================================= */}
      <section id="capital" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={Anchor}>Capital Humano</SectionTitle>

        <CardBox>
          <SectionTitle icon={Anchor}>{Data.capitalHumano.titulo}</SectionTitle>
          {Data.capitalHumano.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
        </CardBox>

        <CardBox>
          <SubTitle>{Data.capitalHumano.crises.titulo}</SubTitle>
          <P>{Data.capitalHumano.crises.paragrafo}</P>
        </CardBox>

        <CardBox accent>
          <SubTitle>{Data.capitalHumano.vocabulario.titulo}</SubTitle>
          <P>{Data.capitalHumano.vocabulario.intro}</P>
          <DataTable
            headers={["✅ Use com força (Interno)", "❌ Substitua / Evite", "Por quê?"]}
            rows={Data.capitalHumano.vocabulario.itens.map((v) => [v.use, v.evite, v.porque])} />
          
        </CardBox>

        <CardBox>
          <SubTitle>{Data.capitalHumano.employerBranding.titulo}</SubTitle>
          <P>{Data.capitalHumano.employerBranding.paragrafo}</P>
        </CardBox>

        <CardBox>
          <SubTitle>{Data.capitalHumano.onboarding.titulo}</SubTitle>
          {Data.capitalHumano.onboarding.paragrafos.map((p, i) => <P key={i}>{p}</P>)}
        </CardBox>

        <CardBox>
          <SubTitle>{Data.capitalHumano.hellYesHellNo.titulo}</SubTitle>
          <P>{Data.capitalHumano.hellYesHellNo.intro}</P>
          <DataTable
            headers={["Hell Yes ✅", "Hell No ❌"]}
            rows={Data.capitalHumano.hellYesHellNo.pares.map((p) => [p.hellYes, p.hellNo])} />
        </CardBox>
        <TomEVozAIFoodInline type="area" id="capitalHumano" label="Capital Humano" />
      </section>

      {/* ============================================================= */}
      {/*  PRODUTO E CX — área da empresa, não produto                    */}
      {/* ============================================================= */}
      <section id="produto-cx" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={Sparkles}>{Data.produtoCx.titulo}</SectionTitle>

        <CardBox>
          <P>{Data.produtoCx.intro}</P>
          <DataTable
            headers={["O que não usamos", "O que usamos"]}
            rows={Data.produtoCx.tabela} />
          
        </CardBox>

        <CardBox accent>
          <SubTitle>{Data.formatosSuportes.titulo}</SubTitle>
          <div className="space-y-3">
            {Data.formatosSuportes.itens.map((f) =>
            <div key={f.formato} className="flex flex-col sm:flex-row sm:items-start gap-2 rounded-lg bg-muted/50 p-3">
                <Badge variant="secondary" className="shrink-0 font-bold text-xs">{f.formato}</Badge>
                <p className="text-sm font-roboto text-foreground/80">{f.estilo}</p>
              </div>
            )}
          </div>
        </CardBox>

        <CardBox>
          <SubTitle>Particularidades de conteúdos</SubTitle>
          <P>{Data.particularidadesConteudo.intro}</P>
          {Data.particularidadesConteudo.itens.map((item) =>
          <div key={item.nome} className="rounded-lg bg-muted/50 p-3 mb-2">
              <p className="text-xs font-bold text-accent uppercase mb-1">{item.nome}</p>
              <p className="text-sm font-roboto text-foreground/80">{item.descricao}</p>
            </div>
          )}
        </CardBox>

        <CardBox>
          <SubTitle>Técnicas utilizadas na construção de conteúdos</SubTitle>
          <ul className="space-y-2 mt-2">
            {Data.particularidadesConteudo.tecnicas.map((t) => (
              <li key={t.nome} className="flex items-start gap-2 text-sm font-roboto text-foreground/80">
                <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span><strong className="text-foreground">{t.nome}:</strong> {t.descricao}</span>
              </li>
            ))}
          </ul>
        </CardBox>

        <CardBox>
          <SubTitle>{Data.particularidadesConteudo.padroesAssinatura.titulo}</SubTitle>
          <P>{Data.particularidadesConteudo.padroesAssinatura.intro}</P>
          <ul className="space-y-2 mt-2">
            {Data.particularidadesConteudo.padroesAssinatura.itens.map((i) => (
              <li key={i.nome} className="flex items-start gap-2 text-sm font-roboto text-foreground/80">
                <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                <span><strong className="text-foreground">{i.nome}:</strong> {i.descricao}</span>
              </li>
            ))}
          </ul>
        </CardBox>
        <TomEVozAIFoodInline type="area" id="produtoCx" label="Produto e CX" />
      </section>

      {/* ============================================================= */}
      {/*  PRODUTOS — exemplos representativos                            */}
      {/* ============================================================= */}

      {/* Produto A */}
      <section id="produto-a" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={GraduationCap}>{Data.produtoA.titulo}</SectionTitle>
        <CardBox>
          <P>{Data.produtoA.intro}</P>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-lg bg-accent/10 p-3"><p className="text-xs font-bold text-accent uppercase mb-1">Voz</p><p className="text-sm font-roboto text-foreground/80">{Data.produtoA.voz}</p></div>
            <div className="rounded-lg bg-muted/50 p-3"><p className="text-xs font-bold text-foreground/60 uppercase mb-1">Tom</p><p className="text-sm font-roboto text-foreground/80">{Data.produtoA.tom}</p></div>
          </div>
        </CardBox>
        <CardBox>
          <SubTitle>Diretrizes de comunicação</SubTitle>
          <BulletList items={Data.produtoA.diretrizes} icon="check" />
        </CardBox>
        <CardBox>
          <SubTitle>Evitar</SubTitle>
          <BulletList items={Data.produtoA.evitar} icon="x" />
        </CardBox>
        <CardBox>
          <DataTable headers={["Situação", "✅ Como agir", "❌ O que evitar"]} rows={Data.produtoA.exemplos.map((e) => [e.situacao, e.comoAgir, e.evitar])} />
        </CardBox>
        <TomEVozAIFoodInline type="produto" id="produtoA" label="Produto A" />
      </section>

      {/* Produto B */}
      <section id="produto-b" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={Layers}>{Data.produtoB.titulo}</SectionTitle>
        <CardBox>
          <P>{Data.produtoB.intro}</P>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-lg bg-accent/10 p-3"><p className="text-xs font-bold text-accent uppercase mb-1">Voz</p><p className="text-sm font-roboto text-foreground/80">{Data.produtoB.voz}</p></div>
            <div className="rounded-lg bg-muted/50 p-3"><p className="text-xs font-bold text-foreground/60 uppercase mb-1">Tom</p><p className="text-sm font-roboto text-foreground/80">{Data.produtoB.tom}</p></div>
          </div>
        </CardBox>
        <CardBox>
          <SubTitle>Diretrizes de comunicação</SubTitle>
          <BulletList items={Data.produtoB.diretrizes} icon="check" />
        </CardBox>
        <CardBox>
          <SubTitle>Evitar</SubTitle>
          <BulletList items={Data.produtoB.evitar} icon="x" />
        </CardBox>
        <CardBox>
          <DataTable headers={["Situação", "✅ Como agir", "❌ O que evitar"]} rows={Data.produtoB.exemplos.map((e) => [e.situacao, e.comoAgir, e.evitar])} />
        </CardBox>
        <TomEVozAIFoodInline type="produto" id="produtoB" label="Produto B" />
      </section>

      {/* Produto C */}
      <section id="produto-c" className="space-y-6 scroll-mt-24 pb-[60px]">
        <SectionTitle icon={Award}>{Data.produtoC.titulo}</SectionTitle>
        <CardBox>
          <P>{Data.produtoC.intro}</P>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-lg bg-accent/10 p-3"><p className="text-xs font-bold text-accent uppercase mb-1">Voz</p><p className="text-sm font-roboto text-foreground/80">{Data.produtoC.voz}</p></div>
            <div className="rounded-lg bg-muted/50 p-3"><p className="text-xs font-bold text-foreground/60 uppercase mb-1">Tom</p><p className="text-sm font-roboto text-foreground/80">{Data.produtoC.tom}</p></div>
          </div>
        </CardBox>
        <CardBox>
          <SubTitle>Diretrizes de comunicação</SubTitle>
          <BulletList items={Data.produtoC.diretrizes} icon="check" />
        </CardBox>
        <CardBox>
          <SubTitle>Evitar</SubTitle>
          <BulletList items={Data.produtoC.evitar} icon="x" />
        </CardBox>
        <CardBox>
          <DataTable headers={["Situação", "✅ Como agir", "❌ O que evitar"]} rows={Data.produtoC.exemplos.map((e) => [e.situacao, e.comoAgir, e.evitar])} />
        </CardBox>
        <TomEVozAIFoodInline type="produto" id="produtoC" label="Produto C" />
      </section>


    </div>);

}